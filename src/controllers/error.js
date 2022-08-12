export const handle404 = (req, res) => {
  const { isLoggedIn } = req;

  res.render("404", {
    pageTitle: "No Page Found with This URL",
    tab: "404",
    isLoggedIn,
    role: req?.user?.role || "",
  });
};
