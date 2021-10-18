import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'

function LocationDetail(props) {

    const [newName, setNewName] = useState('');
	const [newLongitude, setNewLongitude] = useState('')
    const [newLatitude, setNewLatitude] = useState('')
    const [location, setLocation] = useState()
    const [inEditMode, setInEditMode] = useState(false)

    const id = props.match.params.id
    
    const getLocation = () => {
        axios.get(`${API_URL}/api/locations/${id}`)
             .then(res => { 
                console.log(res.data)
                setLocation(res.data)     
             })
             .catch(err => console.log(err))
        }

    useEffect(() => {
        getLocation()
    })
        

    const API_URL = 'http://localhost:5005'

    const updateLoction = (e) => {
        e.preventDefault();
        const requestBody = {newName, newLatitude, newLongitude}
        axios.put(`${API_URL}/api/locations/edit/${id}`, requestBody)
             .then()
    }

    const deleteLocation = () => {
    
        axios.delete(`${API_URL}/api/locations/${id}`)
            .then(() => {
                // redirect to the locations list
                props.history.push('/api/locations');
            })
            .catch(err => console.log(err));
    }

    const edit = () => {
        //setInEditMode(true)
        console.log(location)
    }


    if (inEditMode === false){
        return (
            <div>
                <button onClick={edit}>edit</button>
                <button onClick={deleteLocation}>delete</button>
                <h2>{location.name}</h2>
                <h4>{location.coordinates}</h4>
            </div>
        )
    }

    if (inEditMode === true){
        return (
            <div>

            <form onSubmit={updateLoction}>
				<label htmlFor="name">edit name of location</label>
				<input
					type="text"
					name="name"
                    placeholder={location.name}
					value={newName}
					onChange={e => setNewName(e.target.value)}
				/>

				<label htmlFor="longitude">edit logitude of location </label>
				<input
					type="text"
					name="longitude"
                    placeholder={location.coordinates[0]}
					value={newLongitude}
					onChange={e => setNewLongitude(e.target.value)}
				/>

				<label htmlFor="latitude">edit latitude of location </label>
				<input
					type="text"
					name="latitude"
                    placeholder={location.coordinates[1]}
					value={newLatitude}
					onChange={e => setNewLatitude(e.target.value)}
				/>
				<button type="submit">update this location</button>
			</form>
        </div>
        )
    }
}

export default LocationDetail
