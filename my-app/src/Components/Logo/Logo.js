import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 40 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner"><img style={{padding: '25px'}} alt='brain logo' src={brain} /> </div>
            </Tilt>
        </div>
    )
};

export default Logo;