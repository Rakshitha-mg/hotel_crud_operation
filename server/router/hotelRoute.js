import express from 'express';
import {createhotel,getOnehotel,getAllhotels,deletehotel,updatehotel} from "../controllers/hotelController.js"

const route=express.Router();

route.post("/create",createhotel);
route.get("/getAll",getAllhotels);
route.get("/getOne/:id",getOnehotel);
route.put("/update/:id",updatehotel);
route.delete("/deleteone/:id",deletehotel);

export default route;