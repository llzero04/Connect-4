import React from "react";

const InputBox = function(props)
{
    return(
        <div className="inputBox" onClick={(e) => {props.makeMove(props.col)}}>
            {props.text}
        </div>
    )
}

export default InputBox;