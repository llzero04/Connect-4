import React from "react";

const GameOptions = function(props)
{
    return(
        <div className="gameOptions">
            <h3>Game Mode</h3>
            <select onChange={(e) => {props.changeGameMode(e)}}>
                <option> </option>
                <option>Single Player</option>
                <option>Two Player</option>
            </select>
        </div>
    )
}

export default GameOptions;