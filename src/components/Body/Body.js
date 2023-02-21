import React, {useEffect} from 'react';
import './Body.css';
import {AiFillClockCircle} from "react-icons/ai";
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';

export default function Body() {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch ] = useStateProvider();
  useEffect (() => {
    const getCurrentPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization:'Bearer '+ token,
            'Content-Type': 'application/json',
          },
        }
      );
      
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
        })),
      };
      dispatch({type: reducerCases.SET_PLAYLIST, selectedPlaylist})
    };
    getCurrentPlaylist();
    
  }, [token, dispatch, selectedPlaylistId]);

  const time = (ms) => {
    const minutes = Math.floor(ms/60000);
    const seconds = ((ms%60000)/1000).toFixed(0);
    return minutes + ":" + (seconds <10 ? '0' : '') + seconds;
  }

  return (
    <div className='body'>
      {
        selectedPlaylist && (
          <>

            <div className='playlist'>

              <div className='image'>
                <img src={selectedPlaylist.image} alt='selectedplaylist'/>
              </div>

              <div className='details'>
                <div className='type'>
                  <span className='type'>PLAYLIST</span>
                  <h1 className='title'>{selectedPlaylist.name}</h1>
                  <p className='description'>{selectedPlaylist.description}</p>
                </div>
              </div>

            </div>

            <div className='list'>

              <div className='header-row'>

                <div className='col'>
                  <span>#</span>
                </div>

                <div className='col'>
                  <span>TITLE</span>
                </div>

                <div className='col'>
                  <span>ALBUM</span>
                </div>

                <div className='col'>
                  <span>
                    <AiFillClockCircle />
                  </span>
                </div>
              
              </div>

              <div className='tracks'>
                {
                  selectedPlaylist.tracks.map(({
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                  },index) => {
                      return (
                        <div className='row' key={id}>

                          <div className='col'>
                            <span>{index+1}</span>
                          </div>

                          <div className='col detail'>

                            <div className='image'>
                              <img src={image} alt='track'/>
                            </div>

                            <div className='info'>
                              <span className='name'>{name}</span>
                              <br/>
                              <span>{artists}</span>
                            </div>

                          </div>

                            
                          <div className='col'>
                            <span>{album}</span>
                          </div>

                          <div className='col'>
                             <span>{ time(duration)}</span>
                          </div>

                        </div>
                      );
                    }) 
                }
                </div>
              </div>
          </>
        )
      }
    </div>
  )
}
