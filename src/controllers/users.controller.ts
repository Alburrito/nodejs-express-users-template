import { NextFunction, Request, Response } from "express";
import { User, UserDocument } from "../models/User";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import "../config/passport";

class UsersController {
  public signUpView(req: Request, res: Response) {
    res.render("users/signup", { title: "Register", username: "", email: "" , errors: []});
  }

  public async signUp(req: Request, res: Response) {
    const errors = [];
    const { username, email, password, repeatPassword } = req.body;

    if (!username) {
      errors.push({ text: "Username missing" });
    }

    if (!email) {
      errors.push({ text: "Email missing" });
    }

    if (!password) {
      errors.push({ text: "Password missing" });
    } else {
      if (password.length < 8) {
        errors.push({
          text: "Password lenght must be at least 8 char",
        });
      }
      if (!repeatPassword) {
        errors.push({ text: "Confirmed password missing" });
      } else if (password != repeatPassword) {
        errors.push({ text: "Passwords must match" });
      }
    }

    if (errors.length > 0) {
      res.render("users/signup", {
        errors,
        username,
        email,
        title: "Register",
      });
    } else {
      const sameEmail = await User.findOne({ email: email });
      const sameUsername = await User.findOne({ username: username });
      if (sameEmail) {
        errors.push({ text: "Email already in use" });
      }
      if (sameUsername) {
        errors.push({
          text: "Username already in use",
        });
      }
      if (errors.length > 0) {
        res.render("users/signup", {
          errors,
          title: "Register",
        });
      } else {
        const newUser = new User({ username, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        console.log(newUser);
        req.flash("success_msg", "Account successfully registered");
        res.redirect("/");
      }
    }
  }

  public signInView(req: Request, res: Response) {
    res.render("users/signin", { title: "Login", errors: [] });
  }

  public signIn(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash("error_msg", "Fail login");
            return res.redirect("/users/signin");
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash("success_msg", "Login success!");
            res.redirect("/");
        });
    })(req, res, next);
  }

  public logout(req: Request, res: Response) {
      req.logout();
      req.flash("success_msg", "Logout successfully");
      res.redirect("/");
  }
}

export const usersController = new UsersController();