const express = require("express");
const router = express.Router();
const multer  = require('multer')
const{storage}=require("../cloudinary.js");
const upload = multer({storage });
const Listing=require("../models/listings.js");
const listingControllers=require("../controllers/explore.js");
const { search } = require("./listings.js");

router.get("/explore/trending",listingControllers.trending)
router.get("/explore/cities",listingControllers.cities)
router.get("/explore/mountainside",listingControllers.mountainside)

router.get("/explore/castles",listingControllers.castles)
router.get("/explore/amazingpools",listingControllers.amazingpools)
router.get("/explore/mostvisited",listingControllers.mostvisited)
router.get("/explore/campaign",listingControllers.campaign)
router.get("/explore/inwater",listingControllers.inwater)
router.get("/explore/arctic",listingControllers.arctic)
router.get("/explore/domes",listingControllers.domes)
router.post("/search",listingControllers.search)
module.exports=router;