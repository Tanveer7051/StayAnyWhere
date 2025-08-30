const { default: mongoose } = require("mongoose");
const { listingSchema } = require("../schema");
const Review=require("./review.js")
let Data=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    // image:{
    //     type:String,
    //     default:"https://tse3.mm.bing.net/th/id/OIP.U_VJuupQohwnzXcKMztqWgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     set:(v)=>
    //         v===""
    //         ? "https://tse3.mm.bing.net/th/id/OIP.U_VJuupQohwnzXcKMztqWgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    //         :v,      
    // },
    image: {
    filename: {
        type: String,
        default: 'default'
    },
    url: {
        type: String,
        default: "https://tse3.mm.bing.net/th/id/OIP.U_VJuupQohwnzXcKMztqWgHaEo"
    }
},
    price:Number,
    location:String,
    country:String,
    viewPoint:String,
    reviews:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review' 
    }],

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

//It will delete all the associated reviews to the particular listing
Data.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing=mongoose.model("Listing",Data)
module.exports=Listing;