export const userAuth = (req, res, next) => {
  const { isLoggedIn } = req;

  if (!isLoggedIn) {
    res.redirect("/shop");
    return;
  }

  next();
};
