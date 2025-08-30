const Review=require("../models/review");
const Listing=require("../models/listings");
const sanitizeHtml = require("sanitize-html");

module.exports.createReview=async (req, res) => {
    // let {id}=req.params;
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);

    const sanitizedComment = sanitizeHtml(req.body.review.comment);
      let newReview = new Review({
        rating: req.body.review.rating,
        comment: sanitizedComment,
        author: req.user._id,
    });

    // let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    newReview.author=req.user._id;
    console.log(req.user._id);
    console.log(listing);
    await listing.save();
    await newReview.save();
    req.flash("success", "Review Created!");
    const updatedListing = await Listing.findById(req.params.id).populate("reviews");
    //res.redirect is only used because i want to pop the success message also in first review 
    res.redirect(`/listings/${req.params.id}`);
    // res.render("listings/show.ejs", { listing: updatedListing });
}

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    const listing = await Listing.findById(id).populate("owner");
    const review = await Review.findById(reviewId).populate("author");

    if (!listing || !review) {
        req.flash("error", "Listing or Review not found.");
        return res.redirect(`/listings/${id}`);
    }

    const isReviewAuthor = review.author._id.equals(req.user._id);
    const isListingOwner = listing.owner._id.equals(req.user._id);

    if (!isReviewAuthor && !isListingOwner) {
        req.flash("error", "You do not have permission to delete this review.");
        return res.redirect(`/listings/${id}`);
    }

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};