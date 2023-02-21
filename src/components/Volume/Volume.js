import React from 'react';
import './Volume.css'

export default function Volume() {

    return (
        <div className='volume' color='gray' >
            <input type='range' min={0} max={100} />
        </div>
    )
}
