import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { UserModel } from "../../../api/user/user.model";
import { UserIdentityModel } from "../local/user-identity.model";
import { v4 as uuidv4 } from "uuid";
import { requireEnvVars } from "../../dotenv";
import { getIP } from "../../fetch-ip";

const [CLIENT_ID, CLIENT_SECRET, CALLBACK_URL] = requireEnvVars([
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "GITHUB_CALLBACK_URL",
]);

passport.use(
  new GitHubStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
      const ip: string | undefined = await getIP();
      const allowedIps: string[] = [];
      if (ip) allowedIps.push(ip);

      let user = await UserModel.findOne({ username: email });
      if (!user) {
        user = await UserModel.create({
          username: email,
          firstName: profile.displayName?.split(" ")[0] || profile.username,
          lastName: profile.displayName?.split(" ")[1] || "",
          picture: profile.photos?.[0]?.value,
          isActive: true,
          lastAllowedIp: ip,
          allowedIps: allowedIps,
          role: "user",
        });

        await UserIdentityModel.create({
          provider: "github",
          user: user._id,
          credentials: {
            username: email,
            hashedPassword: uuidv4(), // Unused
          },
        });
      }

      return done(null, user.toObject());
    }
  )
);
