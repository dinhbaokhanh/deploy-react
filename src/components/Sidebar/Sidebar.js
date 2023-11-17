import React from 'react';
import './Sidebar.css';
import { MdLibraryMusic } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import Playlists from '../Playlists/Playlists';

export default function Sidebar() {
  return (
      <div className='sidebar'>

        <div className='top'>

          <div className='logo'>
            <img 
            src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png' 
            alt='spotify' 
            />
          </div>
          

          <ul>
            <li>
              <AiFillHome />
              <span>Home</span>
            </li>
            <li>
              <BiSearch />
              <span>Search</span>
            </li>
            <li>
              <MdLibraryMusic />
              <span>Your Library</span>
            </li>
          </ul>

        </div>

        <div className='line'></div>

        <Playlists />

      </div>
    
  )
}
