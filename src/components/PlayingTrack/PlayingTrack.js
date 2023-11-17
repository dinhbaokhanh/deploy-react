import React,{ useEffect } from 'react';
import './PlayingTrack.css';
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';

export default function PlayingTrack() {
  const [{ token, currentlyPlaying }, dispatch ] = useStateProvider();

  useEffect(() => {
    const getPlaying = async () => {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/player/currently-playing', 
        {
          headers: {
            Authorization:'Bearer '+ token,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data !== "") {
        const currentlyPlaying = {
            id: response.data.item.id,
            name: response.data.item.name,
            artists: response.data.item.artists.map((artist) => artist.name),
            image: response.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
    }};
    getPlaying();

  }, [token, dispatch]);

  return (

    <div className='playing-track'>

      {
        currentlyPlaying && (

          <div className="track">
            <div className="track-image">
              <img src={currentlyPlaying.image} alt="currentlyPlaying" />
            </div>
            <div className="track-info">
              <h4>{currentlyPlaying.name}</h4>
              <h6>{currentlyPlaying.artists.join(", ")}</h6>
            </div>
          </div>

      )}
        
    </div>
  )
}
