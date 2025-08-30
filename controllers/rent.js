module.exports.buy=(req,res)=>{
  res.render("user/buy.ejs");
}
module.exports.receipt=(req, res) => {
  const { fullName, email, phone, checkIn, checkOut, guests } = req.body;

  res.render("user/receipt.ejs", {
    fullName,
    email,
    phone,
    checkIn,
    checkOut,
    guests,
    listingId: req.params.id
  });
}