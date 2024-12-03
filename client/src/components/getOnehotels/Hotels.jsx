import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "./style.css"
import { Link } from 'react-router-dom';

const Hotels = () => {
  const [hotels, sethotels] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
        const response = await axios.get("http://localhost:8000/api/getall");
        sethotels(response.data);
    }

    fetchData();

  }, [])

  const deletehotel = async (userId) => {
      await axios.delete(`http://localhost:8000/api/deleteone/${userId}`)
      .then((response) => {
        sethotels((prevUser) => prevUser.filter((user) => user._id !== userId))
        toast.success(response.data.msg, { position: 'top-right' })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='hotelTable'>
        <h1>Hotels List</h1>
        <Link to={"/create"} className='addButton'>Add User</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.no.</th>
                    <th>hotel name</th>
                    <th>location</th>
                    <th>rating</th>
                    <th>price</th>
                    <th>amenities</th>
                </tr>
            </thead>
            <tbody>
                {
                    hotels.map((hotel, index) => {
                        return (
                        <tr key={hotel._id}>
                            <td>{index + 1}</td>
                            <td>{hotel.hotel_name}</td>
                            <td>{hotel.location}</td>
                            <td>{hotel.rating}</td>
                            <td>{hotel.price}</td>
                            <td>{hotel.amenities}</td>
                            <td className='actionButtons'>
                                <button onClick={() => deletehotel(hotel._id)}><i className="fa-solid fa-trash">Delete</i></button>
                                <Link to={`/update/${hotel._id}`}><i className="fa-solid fa-pen-to-square">Edit</i></Link>
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default Hotels;
