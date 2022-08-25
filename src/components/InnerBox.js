import React from "react";

const InnerBox = function(props)
{
    let classname = "";
    if(props.text.localeCompare('-') == 0) classname = "emptyToken";
    else if(props.text.localeCompare('R') == 0) classname = "redToken";
    else if(props.text.localeCompare('Y') == 0) classname = "yellowToken";
    let txt = "";
    if(props.text.localeCompare('-') == 0) txt = "-";
    else txt = props.text;

    return(
        <div className="innerBox">
            <div className={classname}>{txt}</div>
        </div>
    )
}

export default InnerBox;