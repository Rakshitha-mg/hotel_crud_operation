import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast  from 'react-hot-toast';
import "bootstrap/dist/css/bootstrap.min.css"

const Edit = () => {

 const initialUser = {
    hotel_name: "",
    location: "",
    rating: "",
    price: "",
    amenities: ""
 }

 const { id } = useParams(); // Get the dynamic ID from the URL
 const navigate = useNavigate();
 const [user, setUser] = useState(initialUser);

 const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
 }

 useEffect(() => {
    axios.get(`http://localhost:8000/api/getOne/${id}`)
    .then((response) => {
        setUser(response.data); // Update the user state with fetched data
    })
    .catch((error) => {
        console.error("Error fetching the hotel data: ", error);
    })
 }, [id]); // Run this effect when the `id` changes

 const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
    .then((response) => {
       toast.success(response.data.msg, { position: "top-right" });
       navigate("/"); // Redirect to the home page after update
    })
    .catch((error) => {
       console.error("Error updating the hotel: ", error);
       toast.error("Error updating the hotel", { position: "top-right" });
    })
 }

  return (
    <div className='addUser'>
        <Link to={"/create"}>Back</Link> {/* Adjust the link to point to create page */}
        <h3>Update Hotel</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="hotel_name">Hotel Name</label>
                <input 
                    type="text" 
                    value={user.hotel_name} 
                    onChange={inputChangeHandler} 
                    id="hotel_name" 
                    name="hotel_name" 
                    autoComplete='off' 
                    placeholder='Hotel Name' 
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="location">Location</label>
                <input 
                    type="text" 
                    value={user.location} 
                    onChange={inputChangeHandler} 
                    id="location" 
                    name="location" 
                    autoComplete='off' 
                    placeholder='Location' 
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="rating">Rating</label>
                <input 
                    type="number" 
                    value={user.rating} 
                    onChange={inputChangeHandler} 
                    id="rating" 
                    name="rating" 
                    autoComplete='off' 
                    placeholder='Rating' 
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="price">Price</label>
                <input 
                    type="number" 
                    value={user.price} 
                    onChange={inputChangeHandler} 
                    id="price" 
                    name="price" 
                    autoComplete='off' 
                    placeholder='Price' 
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="amenities">Amenities</label>
                <input 
                    type="text" 
                    value={user.amenities} 
                    onChange={inputChangeHandler} 
                    id="amenities" 
                    name="amenities" 
                    autoComplete='off' 
                    placeholder='Amenities' 
                />
            </div>
            <div className="inputGroup">
                <button type="submit">UPDATE HOTEL</button>
            </div>
        </form>
         {/* Make sure to render the toast container */}
    </div>
  )
}

export default Edit;
