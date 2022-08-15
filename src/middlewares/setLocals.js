export const setLocals = (req, res, next) => {
  res.locals.isLoggedIn = req.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();

  // to prevent passing these into unwanted pages
  const err = req.flash("error")[0];
  const errorContents = req.flash("errorContents");
  const errorId = req.flash("errorId");
  /*
  connect-flash package can't store Boolean values instead stored "false" and then convert
  it to Boolean
  */
  res.locals.error = (err && JSON.parse(err)) || false;
  res.locals.errorContents = errorContents || [];
  res.locals.errorId = errorId || "";

  console.log("error is: ", err);
  console.log("error contents is: ", errorContents);
  console.log("error id is: ", errorId);

  next();
};
