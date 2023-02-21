import React, {useEffect} from 'react';
import './Spotify.css';
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../Navbar/Navbar.js';
import Body from '../Body/Body.js';
import Footer from '../Footer/Footer.js';
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';

export default function Spotify() {
    const [{ token }, dispatch ] = useStateProvider();

    useEffect(() => {
        const getInfo = async () => {
            const { data } = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization:'Bearer '+ token,
                    'Content-Type': 'application/json',
                },
            });
            const userInfo = {
                userId: data.id,
                userName: data.display_name,
            };
            dispatch({ type: reducerCases.SET_USER, userInfo });    
        };
        getInfo();
    }, [dispatch, token])
    return (
        <div className='spotify'>

            <div className='spotify-body'>
                <Sidebar />
                <div className='body'>
                    <Navbar />
                    <div className='body-contents'>
                        <Body />
                    </div>

                </div>

            </div>

            <div className='spotify-footer'>
                <Footer />
            </div>

        </div>
    )
}
