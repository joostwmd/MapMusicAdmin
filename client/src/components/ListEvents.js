import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'

function ListEvents() {
    
    const API_URL = "http://localhost:5005"
    const [events, setEvents] = useState([])

    const getAllEvents = () => {
    axios.get(`${API_URL}/api/events`)
        .then(res => {
            setEvents(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    
    return (
        <div>
            <h3>all events</h3>

            {events.map(event => {
                return (
                    <div>
                        <Link to={`/events/${event._id}`}>{event.name}</Link>
                    </div>

                )
            })}
        </div>
    )
}

export default ListEvents
