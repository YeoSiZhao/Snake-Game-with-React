/* eslint-disable react/prop-types */
import './button.css';
const Button = ({ onUp, onDown, onLeft, onRight }) => {
    return (
        <div className="button-container">
            <div className="button-row">
                <button className="game-button" onClick={onUp}>Up</button>
            </div>
            <div className="button-row">
                <button className="game-button" onClick={onLeft}>Left</button>
                <button className="game-button" onClick={onRight}>Right</button>
            </div>
            <div className="button-row">
                <button className="game-button" onClick={onDown}>Down</button>
            </div>
        </div>
    );
};

export default Button;
