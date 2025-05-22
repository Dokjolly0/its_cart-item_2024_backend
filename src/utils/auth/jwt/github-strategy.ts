import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { UserModel } from "../../../api/user/user.model";
import { UserIdentityModel } from "../local/user-identity.model";
import { v4 as uuidv4 } from "uuid";
import { requireEnvVars } from "../../dotenv";
import { getIP } from "../../fetch-ip";
import { emailService } from "../../services/email.service";
import { isValidResendEmail } from "../local/local-strategy";

const [CLIENT_ID, CLIENT_SECRET, CALLBACK_URL] = requireEnvVars([
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "GITHUB_CALLBACK_URL",
]);

const IS_REQUIRED_EMAIL_VERIFICATION = requireEnvVars("IS_REQUIRED_EMAIL_VERIFICATION") === "true";

passport.use(
  new GitHubStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        const ip = await getIP();
        const allowedIps = ip ? [ip] : [];
        const isActive = !IS_REQUIRED_EMAIL_VERIFICATION;

        let user;
        let userIdentity = await UserIdentityModel.findOne({ "credentials.username": email });
        const confirmationToken = uuidv4();

        if (!userIdentity) {
          // Crea utente e userIdentity
          const [firstName, lastName] = (profile.displayName || profile.username).split(" ");

          user = await UserModel.create({
            username: email,
            firstName: firstName || "",
            lastName: lastName || "",
            picture: profile.photos?.[0]?.value,
            lastAllowedIp: ip,
            allowedIps,
            role: "user",
          });

          userIdentity = await UserIdentityModel.create({
            provider: "github",
            user: user._id,
            credentials: {
              username: email,
              hashedPassword: uuidv4(),
            },
            isActive,
            confirmationToken,
            emailConfirmationSentAt: isActive ? null : new Date(),
          });

          if (!isActive) {
            await emailService.sendConfirmationEmail(email, user.id!, confirmationToken);
          }
        } else {
          user = userIdentity.user;

          if (!userIdentity.isActive && userIdentity.emailConfirmationSentAt) {
            const shouldResend = isValidResendEmail(userIdentity.emailConfirmationSentAt);
            if (shouldResend) {
              await emailService.sendConfirmationEmail(email, user.id!, confirmationToken);
              userIdentity.emailConfirmationSentAt = new Date();
              await userIdentity.save();
            }
          }
        }

        return done(null, user.toObject());
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
