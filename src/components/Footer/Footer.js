import React from 'react';
import Player from '../Player/Player.js';
import PlayingTrack from '../PlayingTrack/PlayingTrack.js';
import Volume from '../Volume/Volume.js';
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer'>
      <PlayingTrack />
      <Player />
      <Volume />
    </div>
  );
}
