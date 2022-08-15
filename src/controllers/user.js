import * as bcrypt from "bcrypt";

import User from "../models/User.js";

export const renderSignUp = (req, res) => {
  const { isLoggedIn } = req;
  console.log(isLoggedIn);

  if (isLoggedIn) {
    res.redirect("/shop");
    return;
  }

  res.render("user/signup", {
    pageTitle: "User Sign Up",
    tab: "signup",
    isLoggedIn,
    role: req?.user?.role || "",
  });
};

export const signUp = async (req, res) => {
  const { password, ...userCredentials } = req.body;

  try {
    const user = await User.findOne({ email: userCredentials.email });
    console.log(userCredentials.email);
    console.log(user);
    if (user) {
      throw new Error("User with this email exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      ...userCredentials,
      password: hashedPassword,
      role: "user",
      cart: {
        items: [],
      },
    });

    const { _id: newUserId } = await newUser.save();
    req.session.userId = newUserId;

    req.session.save((err) => {
      console.log(err);
      res.redirect("/user/signup");
    });
  } catch (err) {
    res.redirect("/user/signup");
    console.log(err);
  }
};

export const renderSignin = async (req, res) => {
  const { isLoggedIn } = req;
  console.log(isLoggedIn);

  if (isLoggedIn) {
    res.redirect("/shop");
    return;
  }

  res.render("user/signin", {
    pageTitle: "User Sign In",
    tab: "signin",
    isLoggedIn,
    role: req?.user?.role || "",
  });
};

export const signIn = async (req, res) => {
  const { body } = req;

  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw new Error("No user found with this email.");
    }

    const doesPassMatch = await bcrypt.compare(body.password, user.password);
    if (!doesPassMatch) {
      throw new Error("Passwords don't match");
    }

    req.session.userId = user._id;

    req.session.save((err) => {
      console.log(err);

      req.flash("error", "false");
      req.flash("errorContents", [
        `Hi Dear ${user.firstname}`,
        "We are happy you are back",
      ]);
      req.flash("errorId", "success-signed-in");

      res.redirect("/shop");
    });
  } catch (err) {
    req.flash("error", true);
    req.flash("errorContents", ["Something is wrong.", err?.message]);
    req.flash("errorId", "failed-signed-in");

    res.redirect("/user/signin");
    console.log(err);
  }
};

export const logout = (req, res) => {
  const { isLoggedIn } = req;

  if (!isLoggedIn) {
    res.redirect("/shop");
    return;
  }

  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/shop");
  });
};
