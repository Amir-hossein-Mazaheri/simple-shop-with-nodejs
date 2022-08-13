export const adminAuth = (req, res, next) => {
  if (req?.user?.role !== "superuser") {
    res.redirect("/shop");
    return;
  }

  next();
};
