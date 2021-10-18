import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
const SpotifyWebApi =  require('spotify-web-api-node')

function AddArtist() {
    //spotify api
    const CLIENT_ID = "dca951119d9442adaff3bb0c8ba9cf43"
    const CLIENT_SECRET = "0693cad954e1458fb57095a8328420ac"

    const [token, setToken] = useState("")

    useEffect(() => {
        const serialize = function(obj) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            return str.join("&");
        }
    
        axios
            .post('https://accounts.spotify.com/api/token',
                serialize({
                    grant_type: 'client_credentials'
                }), {
                headers: {
                    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
                }
            })
            .then(res => setToken(res.data.access_token))
            .catch(err => {
                console.log(err);
            });
        }, [])

    const spotifApi = new SpotifyWebApi({
        clientId : CLIENT_ID, 
        clientSecret : CLIENT_SECRET
    })

    spotifApi.setAccessToken(`${token}`)

    //artist name && line up

    const theLineUp =[]
    const [artistName, setArtistName] = useState("")
    const [lineUp, setLineUp] = useState(theLineUp)

    //search spotify

    const [searchQ, setSearchQ] = useState("")
    const [searchSucess, setSearchSucess] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    
    const [selectedId, setSelectedId] = useState("")
    const [artistSelected, setArtistSelected] = useState(false)

    const search = () => {
        //spotify api
        spotifApi.searchArtists(searchQ)
            .then(function(data) {
                setSearchResults(data.body.artists.items)
            }, function (err) {
                console.error(err)
            })

            setSearchSucess(true)  
   }
        
    
    const selectArtist = (e) => {
        var id = e.target.getAttribute("marker")
        setSelectedId(id)
        setSearchSucess(false)
        setArtistSelected(true)
    
    }

    const addArtist = () => {
        
        const newLineUp = lineUp.concat([{
            artistName : artistName,
            spotifyID : selectedId
        }])

        setLineUp(newLineUp)
        setArtistSelected(false)
        setArtistName("")
        setSearchQ("")
        setSelectedId("")
    }


    if(searchSucess === false && artistSelected === false){
        return (
            <div>
            <ul>
                {lineUp.map(artist => {
                    return (
                        <li>{artist.artistName}{artist.spotifyID}</li>
                    )
                })}
            </ul>
            <h4>add artist to line up</h4>
                
                <label>artist name</label>

                <input 
                    value={artistName}
                    onChange={e => setArtistName(e.target.value)}>
                
                </input>
                
                <input 
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}>

                </input>

                <button onClick={search}>search</button>
                <button onClick={addArtist}>add artist</button>
                
            </div>
        )
    }

    if(searchSucess === true && artistSelected === false){
        return (
            <div>
            
            <ul>
                {lineUp.map(artist => {
                    return (
                        <li>{artist.artistName}{artist.spotifyID}</li>
                    )
                })}
            </ul>

                <label>artist name</label>
                <input 
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}>

                </input>
                

                <ul>
                    {searchResults.map(artist => {
                        return (
                            <div onClick={selectArtist}>
                                <li key={artist.id} marker={artist.id}>{artist.name} , id : {artist.id}</li>
                            </div>
                        )
                    })}
                </ul>

            
            </div>
        )
    }

    if(artistSelected === true){
        return (
            <div>

            <ul>
                {lineUp.map(artist => {
                    return (
                        <li>{artist.artistName}{artist.spotifyID}</li>
                    )
                })}
            </ul>

                <h3>{artistName}</h3>

                {searchResults.map(artist => {
                    if(artist.id === selectedId){
                        return (
                            <h4>artist spotify : {artist.name}</h4>
                        )
                    }
                })}

                <button onClick={addArtist}>add artist</button>
            </div>
        )
    }
}

export default AddArtist