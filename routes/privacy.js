const express = require("express");
const router = express.Router();
const { terms, privacy } = require("../controllers/privacy.js");
router.get("/terms",terms)
router.get("/privacy",privacy);
module.exports=router;