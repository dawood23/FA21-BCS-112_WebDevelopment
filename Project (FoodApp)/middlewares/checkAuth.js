module.exports = async function (req, res, next) {
  if (!req.session.user) {
    req.session.user = null;
    res.redirect("/");
  } else {
    let cart = req.cookies.cart;
    if (!cart) cart = [];
    res.locals.cart = cart;
    res.locals.user = req.session.user;

    next();
  }
};
