const Listing=require("../models/listings");

module.exports.index=async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewForm=(req, res) => {
    console.log(req.user);
    res.render("listings/new.ejs");
}

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    let listing = await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author"
        },
    }).populate("owner");
    if(!listing){
        req.flash("error","The listing you are trying to visit for doe's not exit");
        return res.redirect(`/listings`);
    }
    res.render("listings/show.ejs", { listing });
    // console.log(listing);
}
module.exports.createListing = async (req, res) => {
    const { title, description, price, location, country,viewPoint} = req.body;

    const newData = new Listing({
        title,
        description,
        price,
        location,
        country,
        viewPoint,
        owner: req.user._id
    });

    // Agar file upload hui hai
    if (req.file) {
        newData.image = {
            url: req.file.path,      // Cloudinary path
            filename: req.file.filename
        };
    } else {
        // Agar koi file nahi upload hui to default image
        newData.image = {
            url: "https://tse3.mm.bing.net/th/id/OIP.U_VJuupQohwnzXcKMztqWgHaEo",
            filename: "default"
        };
    }

    await newData.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};


module.exports.renderEditForm=async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","The listing you are trying to visit for doe's not exit");
        return res.redirect("/listings");
    }
    let orginalUrl=listing.image.url;
    orginalUrl=orginalUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing,orginalUrl });
}


module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country, viewPoint } = req.body;

  const updatedListing = {
    title,
    description,
    price: Number(price),
    location,
    country,
    viewPoint,
  };

  // If new image uploaded, update it
  if (req.file) {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await Listing.findByIdAndUpdate(id, updatedListing);

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deletedd!");
    res.redirect("/listings");
    console.log(deletedListing);
}