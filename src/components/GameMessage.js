import React from "react";

const GameMessage = function(props)
{
    return(
        <div className="gameMessage"><h4>{props.text}</h4></div>
    )
}

export default GameMessage;