import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

function EventDetail(props) {
   
    
    //current data
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [name, setName] = useState("")
    const [discription, setDiscription] = useState("")

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [cost, setCost] = useState("")
    const [age, setAge] = useState("")
    const [gerne, setGenre] = useState("")
    const [ticketLink, setTicketLink] = useState("")
    //const [lineUp, setLineUp] = useState([])

    //edit state
    const [locations, setLocations] = useState([])
    const [inEditMode, setInEditMode] = useState(false)
    const allGenre = ["jazz", "techno"]

    const getAllLocations = () => {
        axios.get(`${API_URL}/api/locations`)
             .then(res => {
                 setLocations(res.data)
             })
             .catch(err => console.log(err))
        }
    
    //edited data
    const [newLocation, setNewLocation] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newName, setNewName] = useState("")
    const [newDiscription, setNewDiscription] = useState("")
    const [newTicketLink, setNewTicketLink] = useState("")

    const [newStartTime, setNewStartTime] = useState("")
    const [newEndTime, setNewEndTime] = useState("")
    const [newCost, setNewCost] = useState("")
    const [newAge, setNewAge] = useState("")
    const [newGerne, setNewGenre] = useState("")
    //const [newLineUp, setNewLineUp] = useState([])


    const id = props.match.params.id
    
    const getEvent = () => {
        axios.get(`${API_URL}/api/events/${id}`)
             .then(res => { 
                console.log(res.data)
                setLocation(res.data.location.name)
                setDate(res.data.date)
                setName(res.data.name)
                setDiscription(res.data.discription)
                setTicketLink(res.data.ticketLink)

                setStartTime(res.data.startTime)
                setEndTime(res.data.endTime)
                setCost(res.data.cost)
                setAge(res.data.age)
                setGenre(res.data.genre)
             })
             .catch(err => console.log(err))
        }

    useEffect(() => {
        getEvent()
        getAllLocations()
    }, [])
        

    const API_URL = 'http://localhost:5005'

    const updateEvent = (e) => {
        e.preventDefault();
        const requestBody = {
            newLocation, 
            newDate, 
            newName, 
            newDiscription,
            newTicketLink,
            
            newStartTime,
            newEndTime,
            newCost,
            newAge,
            newGerne
        }
        axios.post(`${API_URL}/api/events/edit/${id}`, requestBody)
             .then(
                props.history.push('/events')
             )
    }

    const deleteEvent = () => {
    
        axios.delete(`${API_URL}/api/events/${id}`)
            .then(() => {
                // redirect to the locations list
                props.history.push('/events');
            })
            .catch(err => console.log(err));
    }

    const edit = () => {
        setInEditMode(true)
    }
    

    if(inEditMode === false){
        return(
            <div>
                <button onClick={edit}>edit</button>
                <button onClick={deleteEvent}>delete</button>
                <label>event name</label>
                <h3>{name}</h3>

                <label>event location</label>
                <h3>{location}</h3>

                <label>event data</label>
                <h3>{date}</h3>

                <label>event description</label>
                <h3>{discription}</h3>

                <h2>general info</h2>
                <label>event start</label>
                <h3>{startTime}</h3>

                <label>event end</label>
                <h3>{endTime}</h3>

                <label>event cost</label>
                <h3>{cost}</h3>

                <label>event age</label>
                <h3>{age}</h3>

                <label>event genre</label>
                <h3>{gerne}</h3>

                <label>event ticket</label>
                <h3>{ticketLink}</h3>
            </div>
        )
    }

    if(inEditMode === true){
        return (
            <div id="addEvent">

            <label>choose location</label>
            <select onChange={e => setNewLocation(e.target.value)}>
                {locations.map(location => {
                    return (
                        <option value={location._id}>{location.name}</option>
                    )
                })}
            </select>

            <label>set date (bsp.: 2.3, 7.10, 23.11</label>
            <input 
                placeholder={date}
                value={newDate}
                onChange={e => setNewDate(e.target.value)}>

            </input>

            <label>name of event</label>
            <input 
                placeholder={name}
                value={newName}
                onChange={e => setNewName(e.target.value)}>

            </input>

            <label>discription</label>
            <input 
                placeholder={discription}
                value={newDiscription}
                onChange={e => setNewDiscription(e.target.value)}>

            </input>

            <label>choose genre</label>
            <select onChange={e => setNewGenre(e.target.value)}>
                {allGenre.map(genre => {
                    return (
                        <option value={genre}>{genre}</option>
                    )
                })}
            </select>

            <label>starting time (bsp.: 17, 20, 23)</label>
            <input 
                placeholder={startTime}
                value={newStartTime}
                onChange={e => setNewStartTime(e.target.value)}>

            </input>

            <label>starting time (bsp.: 2, 6, 11)</label>
            <input 
                placeholder={endTime}
                value={newEndTime}
                onChange={e => setNewEndTime(e.target.value)}>

            </input>

            <label>ticker price</label>
            <input
                placeholder={cost}
                value={newCost}
                onChange={e => setNewCost(e.target.value)}>

            </input>

            <label>age of entrance</label>
            <select onChange={e => setNewAge(e.target.value)}>
                <option value={18}>18 +</option>
                <option value={21}>21 +</option>
            </select>

            <label>ticket-link</label>
            <input 
                placeholder={ticketLink}
                value={newTicketLink}
                onChange={e => setNewTicketLink(e.target.value)}>

            </input>

            
            
            
            {/* <h3>Line Up</h3>
            {lineUp.map(artist => {
               return (
                   <ul>
                       <li>{artist.spotifyID} {artist.artistName}</li>
                   </ul>
               )
           })}
            
            <AddArtist setLineUp={setLineUp} /> */}

            <button onClick={updateEvent}>update event</button> 
        </div>
        )
    }
}

export default EventDetail
