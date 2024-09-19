import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import models from "../db/query.js";

const { User } = models;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findByName(username);

      if (!user) {
        return done(null, false, { message: "user not found" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "invalid password" });
      }

      return done(null, user);
    } catch (error) {
      console.log(error.message);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    console.log(error);
  }
});

export default passport;
