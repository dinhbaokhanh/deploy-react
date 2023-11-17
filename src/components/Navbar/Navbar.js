import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from '../../utils/StateProvider';

export default function Navbar() {

  const [ {userInfo, token} ] = useStateProvider();
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);

  
  async function search() {
    console.log(searchInput);
    var parameter = {
      method: 'GET',
      headers: {
        Authorization:'Bearer '+ token,
        'Content-Type': 'application/json',
      },
    }

    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', parameter)
      .then(response => response.json())
      .then(data => { return data.artists.items[0].id })
    
    var returnAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums', parameter)
      .then(response => response.json())
      .then(data => {
        setAlbums(data.items);
      })
  } 
  console.log(albums);

  return (
    <div className='navbar'>

      <div className='search-bar'>

        <BiSearch onClick={search}/>
        <input 
          className='' 
          type="input" 
          placeholder='What do you want to listen to ?' 

          onKeyUp={event => {
            if(event.key == 'Enter'){
              search();
            } 
          }}
          onChange={event => setSearchInput(event.target.value)}
        />
        

      </div>

      <div className='avatar'>

        <a href='#'>
            <CgProfile />
            <span>{userInfo?.userName}</span>
        </a>

      </div>

    </div>

  )
}

