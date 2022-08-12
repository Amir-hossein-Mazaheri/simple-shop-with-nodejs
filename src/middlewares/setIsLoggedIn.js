export const setIsLoggedIn = (req, res, next) => {
  if (!req?.session || !req?.session?.userId) {
    req.isLoggedIn = false;
    next();
    return;
  }

  req.isLoggedIn = true;
  next();
};
