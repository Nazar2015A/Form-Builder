import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import userModel from "../models/user.model";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Function
    ) => {
      const candidate = await userModel.findOne({ profileId: profile.id });
      if (!candidate) {
        const user = await userModel.create({
          profileId: profile.id,
          firstName: profile.name?.familyName,
          lastName: profile.name?.givenName,
          photo: profile.photos?.[0].value || undefined,
        });
        return done(null, user);
      }
      return done(null, candidate);
    }
  )
);

passport.serializeUser((user: any, done: Function) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: Function) => {
  done(null, user);
});

export default passport;
