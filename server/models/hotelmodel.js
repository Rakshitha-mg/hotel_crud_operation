import mongoose from  "mongoose";
const hotelSchema=new mongoose.Schema({

    hotel_name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    amenities:{
        type:String,
        required:true,
    },
});
export default mongoose.model("Hotel",hotelSchema);