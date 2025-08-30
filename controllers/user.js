const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("user/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Successfully Registered");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};
//hello
module.exports.renderLoginForm = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.authenticateUser = (req, res) => { // Fixed typo
  req.flash("success", "Welcome back!");
  // const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect("/listings");
};

module.exports.logOutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You Logged Out Successfully!");
    res.redirect("/login");
  });
};