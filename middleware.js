const Listing = require('./models/listings');
const Review = require('./models/review');
const ExpressError = require("./utils/expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLogged = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Store the original URL for redirect after login
        req.flash("error", "You must be logged in for this!");
        return res.redirect("/login");
    }
    next();
};

// module.exports.saveRedirectUrl = (req, res, next) => {
//     if (req.session.redirectUrl) {
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
// };
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  req.session.redirectUrl = req.query.redirect || req.originalUrl;
  next();
};
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing || !listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "Only the owner can do this");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Validation Schema Fn
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, msg); // Changed to 400 for validation errors
    }
    next();
};

// For review
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, msg); // Changed to 400 for validation errors
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review || !review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "Only the author can do this");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewOwnerOrListingOwner = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId).populate("author");
    const listing = await Listing.findById(id).populate("owner");

    if (!review || !listing || 
        !review.author._id.equals(req.user._id) && 
        !listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that.");
        return res.redirect(`/listings/${id}`);
    }

    next();
};