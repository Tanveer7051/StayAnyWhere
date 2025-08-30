const express = require("express");
const router = express.Router();

router.get("/feedback",(req,res)=>{
  res.render("./footer/feedback.ejs");
})
router.get("/about",(req,res)=>{
  res.render("./footer/aboutus.ejs");
})
router.get("/services",(req,res)=>{
  res.render("./footer/services.ejs");
})

router.get("/faq",(req,res)=>{
  res.render("./footer/faq.ejs");
})
router.get("/blog",(req,res)=>{
  res.render("./footer/blog.ejs");
})
router.get("/contact",(req,res)=>{
  res.render("./footer/contactsupport.ejs");
})
router.get("/blog/1",(req,res)=>{
  res.render("./footer/blog1.ejs");
})
router.get("/blog/2",(req,res)=>{
  res.render("./footer/blog2.ejs");
})
router.get("/blog/3",(req,res)=>{
  res.render("./footer/blog3.ejs");
})
router.post("/contact-support",(req,res)=>{
  req.flash("success", "Thank you for reaching out! Our support team will get in touch with you within 24 hours.");
  res.redirect("/listings");
})
module.exports=router;