const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {isLogged,validateReview,isReviewOwnerOrListingOwner, isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");

//create Review
router.post("/",isLogged, validateReview, wrapAsync(reviewController.createReview));

//Delete Review Route
// router.delete("/:reviewId",isLogged,isReviewAuthor,wrapAsync(reviewController.destroyReview));
router.delete("/:reviewId", isLogged, isReviewOwnerOrListingOwner, wrapAsync(reviewController.destroyReview));


module.exports = router;