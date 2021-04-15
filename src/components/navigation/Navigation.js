import React from 'react';

const Navigation = ({ onButtonSignout }) => {
    return (
        <nav style = {{display:'flex',justifyContent:'flex-end' }}>
            <p onClick={ onButtonSignout } className = 'f3 link dim black inderline pa3 pointer'>Sign Out</p>
        </nav>
    );
}

export default Navigation;