import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

import AddArtist from './AddArtist'


function AddEvent() {

    const API_URL = 'http://localhost:5005';
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

    const [location, setLocation] = useState("")
    const [lineUp, setLineUp] = useState([])
    
    //general info
    const [discription, setDiscription] = useState("")
    const [genre, setGenre] = useState("")
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [cost, setCost] = useState()
    const [age, setAge] = useState()

    //select content
    const allGenre = ["jazz", "techno"]
    

    const addEvent = () => {
        console.log(locations)
    }
    
    return (
        <div>
            <h1>add event</h1>

            <select onChange={e => setLocation(e.target.value)}>
                {locations.map(location => {
                    return (
                        <option value={location._id}>{location.name}</option>
                    )
                })}
            </select>

            <input 
                value={discription}
                onChange={e => setDiscription(e.target.value)}>

            </input>

            <select onChange={e => setGenre(e.target.value)}>
                {allGenre.map(genre => {
                    return (
                        <option value={genre}>{genre}</option>
                    )
                })}
            </select>

            <input 
                value={startTime}
                onChange={e => setStartTime(e.target.value)}>

            </input>

            <input 
                value={endTime}
                onChange={e => setEndTime(e.target.value)}>

            </input>

            <input
                value={cost}
                onChange={e => setCost(e.target.value)}>

            </input>

            <select onChange={e => setAge(e.target.value)}>
                <option value={18}>18 +</option>
                <option value={21}>21 +</option>
            </select>

            
            
            
            <h3>Line Up</h3>
            {lineUp.map(artist => {
               return (
                   <ul>
                       <li>{artist.spotifyID} {artist.artistName}</li>
                   </ul>
               )
           })}
            
            <AddArtist setLineUp={setLineUp} />

            <button onClick={addEvent}>add event</button> 
        </div>
    )
}

export default AddEvent
