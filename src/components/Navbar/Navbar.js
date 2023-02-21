import React from 'react';
import './Navbar.css';
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from '../../utils/StateProvider';

export default function Navbar() {

  const [ {userInfo} ] = useStateProvider();
  return (
    
    <div className='navbar'>

      <div className='search-bar'>

        <BiSearch />
        <input 
          className='' 
          type="input" 
          placeholder='What do you want to listen to ?' 

          onKeyDownCapture={event => {
            if(event.key == 'Enter'){
              console.log("Is Typing");
            } 
          }}
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

