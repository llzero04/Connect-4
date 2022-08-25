import React, { Fragment } from "react";
import InnerBox from "./InnerBox";
import InputBox from "./InputBox";

const Board = function(props)
{
    return(
        <div className="board">
            {props.columns.map((box) => 
            {
                return(
                    <InputBox key = {box.key} text = {box.val} makeMove = {props.makeMove} col = {box.key}/>
                )
            })}

            {props.board.map((row) =>
            {
                return(
                    <Fragment key = {row[0].key/3 + 1}>
                        {row.map((box) => {return <InnerBox key = {box.key} text = {box.val} />})}
                    </Fragment>
                )
            })}
        </div>
    )
}

export default Board;