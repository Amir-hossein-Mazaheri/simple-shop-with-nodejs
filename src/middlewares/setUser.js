import User from "../models/User.js";

export const setUser = async (req, res, next) => {
  if (!req.isLoggedIn) {
    next();
    return;
  }

  try {
    // adds user object into every request
    req.user = await User.findById(req.session.userId);
  } catch (err) {
    console.log(err);
  }
  next();
};
