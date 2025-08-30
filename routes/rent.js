const express = require("express");
const router = express.Router({ mergeParams: true });
const { buy, receipt } = require("../controllers/rent.js");
const {isLogged,isOwner,validateListing}=require("../middleware.js");

router.route("/")
.get(isLogged,buy)
.post(isLogged,receipt);
module.exports=router