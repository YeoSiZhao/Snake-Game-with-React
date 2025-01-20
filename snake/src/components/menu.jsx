/* eslint-disable react/prop-types */

import './menu.css';
const Menu = ({ onRouteChange }) => {
    return (
        <div className="menu">
            <h1>Snake Game</h1>
            <p>Are you ready to play?</p>
            <button onClick={onRouteChange}>Start Game</button>
        </div>
    );
};

export default Menu;