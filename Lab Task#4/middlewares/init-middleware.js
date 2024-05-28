module.exports = async function (req, res, next) {
  if (req.session.user) {
    if (req.session.user.isAdmin) {
      return res.redirect("/admin");
    } else {
      return res.redirect("/home");
    }
  } else {
    req.session.user = null;
  }

  res.locals.user = req.session.user;
  next();
};
