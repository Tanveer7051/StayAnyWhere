const mongoose = require('mongoose');
const Listing=require("../models/listings.js");
const initData=require("./init.js");
const { application } = require('express');

main()
.then(()=>{
    console.log("DB is connected");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/StayAnyTime');
}

// let newData=async()=>{
//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
// }
// newData();
let newData = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'68a46cd3cf2caa3d82070519'}));
    await Listing.insertMany(initData.data);
    console.log("Database seeded!");
    mongoose.connection.close();  // Close the DB connection
};

newData();