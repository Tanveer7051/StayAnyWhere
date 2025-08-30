const { model } = require("mongoose");
const Listing=require("../models/listings");

module.exports.trending=(req,res)=>{
  res.redirect("/listings");
};
module.exports.cities=async(req,res)=>{
  try {
    const listings = await Listing.find({ viewPoint: "Cities" });
    if (listings.length >= 1) {
        return res.render("explore/cities.ejs", { listings });
    } else {
        req.flash("error", "Sorry, this field doesn't have any Listing right now");
        return res.redirect("/listings");
    }
} catch (err) {
    req.flash("error", "Something went wrong while fetching listings.");
    return res.redirect("/listings");
}

    
}
module.exports.mountainside=async(req,res)=>{
  const listings=await Listing.find({viewPoint:"Mountain Side"});
  // console.log(listings);
    if(listings.length>=1){
    return res.render("explore/mountainside.ejs", {listings});
  }else{
    req.flash("error","Sorry this field does'n have any Listing right now");
    return res.redirect("/listings");
  }
}
module.exports.castles=async(req,res)=>{
  const listings=await Listing.find({viewPoint:"Castles"});
  // console.log(listings);
    if(listings.length>=1){
    return res.render("explore/castles.ejs", {listings});
  }else{
    req.flash("error","Sorry this field does'n have any Listing right now");
    return res.redirect("/listings");
  }
}

module.exports.amazingpools=async(req,res)=>{
  const listings=await Listing.find({viewPoint:"Amazing Pools"});
  // console.log(listings);
    if(listings.length>=1){
    return res.render("explore/amazingpools.ejs", {listings});
  }else{
    req.flash("error","Sorry this field does'n have any Listing right now");
    res.redirect("/listings");
  }
}

module.exports.mostvisited=async(req,res)=>{
  const listings=await Listing.find({viewPoint:"Most Visited"});
  // console.log(listings);
    if(listings.length>=1){
    return res.render("explore/mostvisited.ejs", {listings});
  }else{
    req.flash("error","Sorry this field does'n have any Listing right now");
    res.redirect("/listings");
  }
}

module.exports.campaign=async(req,res)=>{
  const listings=await Listing.find({viewPoint:"Campaign"});
  // console.log(listings);
    if(listings.length>=1){
    return res.render("explore/campaign.ejs", {listings});
  }else{
    req.flash("error","Sorry this field does'n have any Listing right now");
    res.redirect("/listings");
  }
}

module.exports.inwater=async(req,res)=>{
  const listings=await Listing.find({viewPoint:"In Water"});
  // console.log(listings);
    if(listings.length>=1){
    return res.render("explore/inwater.ejs", {listings});
  }else{
    req.flash("error","Sorry this field does'n have any Listing right now");
    res.redirect("/listings");
  }
}
module.exports.arctic=async(req,res)=>{
  const listings=await Listing.find({viewPoint:"Arctic"});
  // console.log(listings);
    if(listings.length>=1){
    return res.render("explore/arctic.ejs", {listings});
  }else{
    req.flash("error","Sorry this field does'n have any Listing right now");
    res.redirect("/listings");
  }
}
module.exports.domes=async(req,res)=>{
  const listings=await Listing.find({viewPoint:"Domes"});
  // console.log(listings);
    if(listings.length>=1){
    return res.render("explore/domes.ejs", {listings});
  }else{
    req.flash("error","Sorry this field does'n have any Listing right now");
    res.redirect("/listings");
  }
}
module.exports.search=async(req,res)=>{
  let query=req.body.search;

    if (!query || !query.trim()) {
    req.flash("error", "Please enter a valid country name to search.");
    return res.redirect("/listings");
  }
  query = query.trim().toLowerCase().split(/\s+/).map(word => 
  word.charAt(0).toUpperCase() + word.slice(1)
).join(' ');

  let result=await Listing.find({country: query});
  // console.log(result);
  if(result.length>=1){
    res.render("explore/search.ejs",{result});
  }else{
    req.flash("error",`${query} is not found, Please seach for another country `);
    res.redirect("/listings");
  }
}