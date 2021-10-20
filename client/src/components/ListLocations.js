import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'


function ListLocations() {
    const API_URL = "http://localhost:5005"
    const [locations, setLocations] = useState([])
    
    const getAllLocations = () => {
    axios.get(`${API_URL}/api/locations`)
         .then(res => {
             setLocations(res.data)
         })
         .catch(err => console.log(err))
    }
    useEffect(() => {
        getAllLocations()
    }, [])

    
    
    return (
        <div>
            <h3>all locations</h3>

            {locations.map(location => {
                return (
                    <div onClick={console.log(location._id)} key={location._id}>
                        <h3>
                            <Link to={`/locations/${location._id}`}>{location.name}</Link>
                        </h3>
                    </div>
                )
            })}
        </div>
    )
}

export default ListLocations
