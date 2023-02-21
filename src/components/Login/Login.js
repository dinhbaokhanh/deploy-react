import React from 'react';
import './Login.css'

export default function Login() {
    const handleClicked = () => {
        const client_id = "9cc98987212f477caa8b9131fce84a54";
        const redirect_uri = "http://localhost:3000/";
        const api_uri = "https://accounts.spotify.com/authorize";
        const scope = [
            'user-read-playback-state',
            'user-modify-playback-state',
            'user-read-currently-playing',
            'app-remote-control',
            'playlist-read-private',
            'playlist-read-collaborative',
            'playlist-modify-private',
            'playlist-modify-public',
            'user-follow-modify',
            'user-follow-read',
            'user-read-playback-position',
            'user-top-read',
            'user-read-recently-played',
            'user-library-modify',
            'user-library-read',
            'user-read-email',
            'user-read-private',
        ];
        window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
        " "
        )}&response_type=token&show_dialog=true`;
    }
    return (
        <div className='login'>
            <img 
            src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png' 
            alt='spotify' />
            <button onClick={handleClicked}>Connect to Spotify</button>
        </div>
    );
}
