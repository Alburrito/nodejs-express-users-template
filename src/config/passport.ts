import { NativeError } from "mongoose";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User, UserDocument } from "../models/User";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      User.findOne({email: email}, async (err: NativeError, user: UserDocument) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, {message: "Can't find the email"});
        }
        const match = await user.matchPassword(password);
        if (!match) {
            return done(undefined, false, {message: "Incorrect password"});
        } else{
            return done (undefined, user);
        }
      });
  })
);

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
});

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error_msg", "You must login before");
    res.redirect("/users/signin");
};