module.exports = async function (req, res, next) {
  if (!req.session.user) {
    req.session.user = null;
    res.redirect("/user/Login");
  } else {
    res.locals.user = req.session.user;
    next();
  }
};
