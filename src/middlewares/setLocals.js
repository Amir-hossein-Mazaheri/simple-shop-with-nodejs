export const setLocals = (req, res, next) => {
  res.locals.isLoggedIn = req.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();

  // to prevent passing these into unwanted pages
  const err = req.flash("error")[0];
  /*
  connect-flash package can't store Boolean values instead stored "false" and then convert
  it to Boolean
  */
  res.locals.error = (err && JSON.parse(err)) || false;
  res.locals.errorContents = req.flash("errorContents") || [];
  res.locals.errorId = req.flash("errorId") || "";

  next();
};
