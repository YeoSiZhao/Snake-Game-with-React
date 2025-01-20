/* eslint-disable react/prop-types */
const Snake = (props) => {
    return (
        <div>
            {props.position.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`,
                };
                return <div className="snake" key={i} style={style} />;
            })}
        </div>
    );
};
export default Snake;