import React, { useState } from "react";
import axios from 'axios';
import './add.css';
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Add = () => {
  const initial = {
    hotel_name: "",
    location: "",
    rating: "",
    price: "",
    amenities: ""
  };
  
  const [hotel, setHotels] = useState(initial);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setHotels({ ...hotel, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    console.log(hotel);
    await axios.post("http://localhost:8000/api/create", hotel,
      {headers:{"Content-Type":"application/json"}},
    )
      .then((res) => {
        toast.success(res.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((err) => {
        toast.error("Error: " + err.response?.data?.msg || err.message, { position: "top-right" });
        console.log(err);
      });
  };

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-4">Back</Link>
      <h1 className="text-center mb-4">Add New Hotel</h1>
      <form onSubmit={submitForm}>
        <div className="form-group mb-3">
          <label htmlFor="hotel_name" className="form-label">Hotel Name:</label>
          <input 
            className="form-control" 
            type="text" 
            id="hotel_name" 
            name="hotel_name" 
            onChange={inputHandler} 
            placeholder="Enter your hotel name" 
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input 
            className="form-control" 
            type="text" 
            id="location" 
            name="location" 
            onChange={inputHandler} 
            placeholder="Enter the location" 
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="rating" className="form-label">Rating:</label>
          <input 
            className="form-control" 
            type="number" 
            id="rating" 
            name="rating" 
            onChange={inputHandler} 
            placeholder="Enter the rating" 
            min="1" 
            max="5"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input 
            className="form-control" 
            type="number" 
            id="price" 
            name="price" 
            onChange={inputHandler} 
            placeholder="Enter the price" 
            min="0" 
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="amenities" className="form-label">Amenities:</label>
          <input 
            className="form-control" 
            type="text" 
            id="amenities" 
            name="amenities" 
            onChange={inputHandler} 
            placeholder="Enter amenities" 
          />
        </div>

        <div className="text-center">
          <button className="btn btn-primary" type="submit">Add Hotel</button>
        </div>
      </form>
    </div>
  );
}

export default Add;
