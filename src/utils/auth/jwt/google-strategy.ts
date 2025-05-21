import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../../../api/user/user.model";
import { UserIdentityModel } from "../local/user-identity.model";
import { v4 as uuidv4 } from "uuid";
import { requireEnvVars } from "../../dotenv";
import { getIP } from "../../fetch-ip";
import { emailService } from "../../services/email.service";

const [GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL] = requireEnvVars([
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
]);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const ip: string | undefined = await getIP();
        const allowedIps: string[] = [];
        if (ip) allowedIps.push(ip);
        const email = profile.emails?.[0].value;
        if (!email) return done(null, false);

        const IS_REQUIRED_EMAIL_VERIFICATION = requireEnvVars("IS_REQUIRED_EMAIL_VERIFICATION");
        const isActive: boolean = IS_REQUIRED_EMAIL_VERIFICATION === "true" ? false : true;
        const confirmationToken = uuidv4();

        let user = await UserModel.findOne({ username: email });

        if (!user) {
          // Crea un nuovo utente
          user = await UserModel.create({
            username: email,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            picture: profile.photos?.[0]?.value,
            isActive: isActive,
            role: "user",
            lastAllowedIp: ip,
            allowedIps: allowedIps,
            createdAt: new Date(),
          });

          await UserIdentityModel.create({
            provider: "google",
            user: user._id,
            credentials: {
              username: email,
              hashedPassword: uuidv4(), // Non usato, solo segnaposto
            },
          });

          if (!user.isActive) {
            emailService.sendConfirmationEmail(email, user.id!, confirmationToken);
          }
        }

        return done(null, user.toObject());
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
