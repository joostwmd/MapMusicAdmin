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
    const [date, setDate] = useState("")
    const [name, setName] = useState("")
    const [lineUp, setLineUp] = useState([])
    
    //general info
    const [discription, setDiscription] = useState("")
    const [genre, setGenre] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [cost, setCost] = useState("")
    const [age, setAge] = useState("")
    const [ticketLink, setTicketLink] = useState("")

    //select content
    const allGenre = ["jazz", "techno"]
    

    const addEvent = () => {
        console.log(location)
        console.log(date)
        console.log(genre)
        console.log(startTime)
        console.log(endTime)
        console.log(cost)
        console.log(age)
        console.log(ticketLink)
        console.log(lineUp)
        console.log(name)
        console.log(discription)

        //line up state isnt lifted 

        //backend & db
        const requestBody = {location, date, name, discription, genre, startTime, endTime, cost, age, ticketLink, lineUp}
        axios.post(`${API_URL}/api/events`, requestBody)
            .then(
                //reset all the input fields
            )
    }
    
    return (
        <div id="addEvent">
            <h1>add event</h1>

            <label>choose location</label>
            <select onChange={e => setLocation(e.target.value)}>
                {locations.map(location => {
                    return (
                        <option value={location._id}>{location.name}</option>
                    )
                })}
            </select>

            <label>set date (bsp.: 2.3, 7.10, 23.11</label>
            <input 
                value={date}
                onChange={e => setDate(e.target.value)}>

            </input>

            <label>name of event</label>
            <input 
                value={name}
                onChange={e => setName(e.target.value)}>

            </input>

            <label>discription</label>
            <input 
                value={discription}
                onChange={e => setDiscription(e.target.value)}>

            </input>

            <label>choose genre</label>
            <select onChange={e => setGenre(e.target.value)}>
                {allGenre.map(genre => {
                    return (
                        <option value={genre}>{genre}</option>
                    )
                })}
            </select>

            <label>starting time (bsp.: 17, 20, 23)</label>
            <input 
                value={startTime}
                onChange={e => setStartTime(e.target.value)}>

            </input>

            <label>starting time (bsp.: 2, 6, 11)</label>
            <input 
                value={endTime}
                onChange={e => setEndTime(e.target.value)}>

            </input>

            <label>ticker price</label>
            <input
                value={cost}
                onChange={e => setCost(e.target.value)}>

            </input>

            <label>age of entrance</label>
            <select onChange={e => setAge(e.target.value)}>
                <option value={18}>18 +</option>
                <option value={21}>21 +</option>
            </select>

            <label>ticket-link</label>
            <input 
                value={ticketLink}
                onChange={e => setTicketLink(e.target.value)}>

            </input>

            
            
            
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
