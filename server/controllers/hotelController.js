import Hotel from "../models/hotelmodel.js";


//create a new user
export const  createhotel = async(req, res)=>{
    try{
        console.log(req.body);
        const hotelData= Hotel(req.body);
        if(!hotelData){
            return res.status(404).json({msg:"hotel not found"});
        }
        await hotelData.save();
        res.status(200).json({msg:"hotel created succcessfully"});
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
}




export const getAllhotels = async (req,res)=>{
    try{
       const hotelData =  await Hotel.find();
       if (!hotelData){
        return res.status(404).json({msg : "hotel not found"});
       }
       
       res.status(200).json(hotelData);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

export const getOnehotel = async (req,res)=>{
    try{
        const id = req.params.id;
       const hotelData =  await Hotel.findById(id);
       if (!hotelData){
        return res.status(404).json({msg : "hotel not found"});
       }
       res.status(200).json(hotelData);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

    export const updatehotel = async (req,res)=>{

        try{
            const id = req.params.id;
           const hotelExist =  await Hotel.findById(id);
           if (!hotelExist){
            return res.status(404).json({msg : "hotel not found"});
           }
        
        await Hotel.findByIdAndUpdate(id,req.body,{ new: true})
        res.status(200).json({msg: "hotel updated successfully"});
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    export const deletehotel = async (req,res)=>{

        try{
            const id = req.params.id;
           const hotelExist =  await Hotel.findById(id);
           if (!hotelExist){
            return res.status(404).json({msg : "hotel not found"});
           }
        
        await Hotel.findByIdAndDelete(id,req.body,{ new: true})
        res.status(200).json({msg: "hotel data successfully deleted"}
        );
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }