import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <div>
           <nav>
                <Link to="/">
                    <button>home</button>
                </Link>

                <Link to="/addLocation">
                    <button>add a location</button>
                </Link>

                <Link to="/locations">
                    <button>all locations</button>
                </Link>

                <Link to="/addEvent">
                    <button>add a event</button>
                </Link>

                <Link to="/events">
                    <button>all events</button>
                </Link>
           </nav>
        </div>
    )
}

export default Nav
