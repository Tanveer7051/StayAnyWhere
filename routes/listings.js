const express = require("express");
const router = express.Router();
const multer  = require('multer')
const{storage}=require("../cloudinary.js");
const upload = multer({storage });

const wrapAsync = require("../utils/wrapAsync.js");
const {isLogged,isOwner,validateListing}=require("../middleware.js");
// router.use(express.urlencoded({extended:true}));
// router.use(express.json());

const listingControllers=require("../controllers/listing.js");

//Show all listing and create listing
router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLogged, upload.single('image'),validateListing, wrapAsync(listingControllers.createListing));
// .post((req,res)=>{
//     res.send(req.file);
// })


//create new listenings
router.get("/new",isLogged, listingControllers.renderNewForm);

//Show Route,Update Listing,Delete Listing
router.route("/:id")
.get(wrapAsync(listingControllers.showListing))
.put(isLogged, upload.single('image'),validateListing, wrapAsync(listingControllers.updateListing))
.delete(isLogged,isOwner, wrapAsync(listingControllers.destroyListing));

//Edit route
router.get("/:id/edit",isLogged,isOwner,wrapAsync(listingControllers.renderEditForm));

module.exports = router;