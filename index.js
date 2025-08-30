if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Listing = require("./models/listings.js");
const Review = require("./models/review.js");
const ejsMate = require("ejs-mate");
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const User = require('./models/user.js');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const exploreRouter = require("./routes/explore.js");
const rentRouter = require("./routes/rent.js");
const privacyRouter = require("./routes/privacy.js");
const footerRoute = require("./routes/footer.js");
const feedbackRoutes = require("./routes/feedback.js");
const nodemailer = require("nodemailer");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "public")));

const db_url = process.env.ATLASDB_URL;
const store = MongoStore.create({
  mongoUrl: db_url,
  crypto: { secret: process.env.SECRET_KEY },
});

store.on("error", (error) => {
  console.log("Mongo Store Error:", error);
});

app.set('trust proxy', 1);

app.use(session({
  store,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(cookieParser());

async function main() {
  try {
    await mongoose.connect(db_url);
    console.log("DB is connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
}
main();

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/listings", exploreRouter);
app.use("/listings/:id/rent", rentRouter);
app.use("/", privacyRouter);
app.use("/", footerRoute);
app.use("/", feedbackRoutes);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  }
});

function sendFeedbackEmail(name, email, message) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    replyTo: email,
    to: "stayanytime.contact@gmail.com",
    subject: "New Feedback from StayAnyTime",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

app.get('/test-flash', (req, res) => {
  req.flash('success', 'Test flash message');
  res.redirect('/listings');
});

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 400, message = "Something Went Wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});