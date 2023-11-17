import React from 'react';
import './Player.css';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle} from 'react-icons/bs';
import {CgPlayTrackNext, CgPlayTrackPrev} from 'react-icons/cg';
import {MdRepeat} from 'react-icons/md';
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';

export default function Player() {

    const [{ token, playerState }, dispatch] = useStateProvider();

    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            }
        );
        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !playerState,
            });
        };
    
    const changeTrack = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }
            }
        );
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });

        const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
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
            console.log(currentlyPlaying);
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
        }

    };
    
    return (
        <div className='player'>

            <div className='shuffle'>
                <BsShuffle />
            </div>

            <div className='previous'>
                <CgPlayTrackPrev onClick={() => changeTrack("previous")}/>
            </div>

            <div className='state'>
                {playerState ? (<BsFillPauseCircleFill onClick={changeState}/>) : (<BsFillPlayCircleFill onClick={changeState}/>)}
            </div>

            <div className='next'>
                <CgPlayTrackNext onClick={() => changeTrack("next")}/>
            </div>

            <div className='repeat'>
                <MdRepeat />
            </div>

        </div>
    )
}
