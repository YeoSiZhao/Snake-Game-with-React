/* eslint-disable react/prop-types */
import './food.css';
const Food = (props) => {
    const style = {
        left: `${props.position[0]}%`,
        top: `${props.position[1]}%`,
    };
    return <div className="food" style={style} />;
};

export default Food;