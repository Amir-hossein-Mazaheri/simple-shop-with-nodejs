export const setLocals = (req, res, next) => {
  res.locals.isLoggedIn = req.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();

  next();
};
