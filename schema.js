// const joi = require("joi");
// const Listing = require("./models/listings");
// module.exports.listingSchema=joi.object({
//     listing:joi.object({
//         title:joi.string().required(),
//         price:joi.number().required().min(0),
//         description:joi.string().required(),
//         location:joi.string().required(),
//         country:joi.string().required(),
//         image: joi.string().allow('', null).optional(),
//     }).optional(),
// })

// schema.js
const Joi = require('joi');
const { default: mongoose } = require('mongoose');

module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  viewPoint: Joi.string().valid("Cities", "Mountain Side", "In Water","Castles","Domes","Arctic","Campaign","Most Visited","Amazing Pools").required(),
  // image: Joi.object({
  //   url: Joi.string().allow('', null),
  //   // filename: Joi.string().optional(),
  // }).required()
}).required();



module.exports.reviewSchema=Joi.object({
  review:Joi.object({
    rating:Joi.number().min(1).max(5).required(),
    comment:Joi.string().required(),
}).required(),
})