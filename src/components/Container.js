import React, { useEffect, useState } from "react";

import Board from "./Board";
import GameOptions from "./GameOptions";
import GameMessage from "./GameMessage";

const Container = function()
{
    let initialBoard = [
        [{key : 1 , val : '-' , x : 0 , y : 0} , {key : 2 , val : '-' , x : 0 , y : 1} , {key : 3 , val : '-' , x : 0 , y : 2} , {key : 4 , val : '-' , x : 0 , y : 3} , {key : 5 , val : '-' , x : 0 , y : 4} , {key : 6 , val : '-' , x : 0 , y : 5} , {key : 7 , val : '-' , x : 0 , y : 6}],
        [{key : 8 , val : '-' , x : 1 , y : 0} , {key : 9 , val : '-' , x : 1 , y : 1} , {key : 10 , val : '-' , x : 1 , y : 2} , {key : 11 , val : '-' , x : 1 , y : 3} , {key : 12 , val : '-' , x : 1 , y : 4} , {key : 13 , val : '-' , x : 1 , y : 5} , {key : 14 , val : '-' , x : 1 , y : 6}],
        [{key : 15 , val : '-' , x : 2 , y : 0} , {key : 16 , val : '-' , x : 2 , y : 1} , {key : 17 , val : '-' , x : 2 , y : 2} , {key : 18 , val : '-' , x : 2 , y : 3} , {key : 19 , val : '-' , x : 2 , y : 4} , {key : 20 , val : '-' , x : 2 , y : 5} , {key : 21 , val : '-' , x : 2 , y : 6}],
        [{key : 22 , val : '-' , x : 3 , y : 0} , {key : 23 , val : '-' , x : 3 , y : 1} , {key : 24 , val : '-' , x : 3 , y : 2} , {key : 25 , val : '-' , x : 3 , y : 3} , {key : 26 , val : '-' , x : 3 , y : 4} , {key : 27 , val : '-' , x : 3 , y : 5} , {key : 28 , val : '-' , x : 3 , y : 6}],
        [{key : 29 , val : '-' , x : 4 , y : 0} , {key : 30 , val : '-' , x : 4 , y : 1} , {key : 31 , val : '-' , x : 4 , y : 2} , {key : 32 , val : '-' , x : 4 , y : 3} , {key : 33 , val : '-' , x : 4 , y : 4} , {key : 34 , val : '-' , x : 4 , y : 5} , {key : 35 , val : '-' , x : 4 , y : 6}],
        [{key : 36 , val : '-' , x : 5 , y : 0} , {key : 37 , val : '-' , x : 5 , y : 1} , {key : 38 , val : '-' , x : 5 , y : 2} , {key : 39 , val : '-' , x : 5 , y : 3} , {key : 40 , val : '-' , x : 5 , y : 4} , {key : 41 , val : '-' , x : 5 , y : 5} , {key : 42 , val : '-' , x : 5 , y : 6}]
    ];
    let initialStackSize = [0 , 0 , 0 , 0 , 0 , 0 , 0];
    let initalGameMessage = "Select a Game Mode";
    
    let columns = [{key : 1 , val : '1'} , {key : 2 , val : '2'} , {key : 3 , val : '3'} , {key : 4 , val : '4'} , {key : 5 , val : '5'} , {key : 6 , val : '6'} , {key : 7 , val : '7'}];
    
    const [board , setBoard] = useState(initialBoard);
    const [gameMessage , setGameMessage] = useState(initalGameMessage);
    const [gameMode , setGameMode] = useState(0);
    const [stackSize , setStackSize] = useState(initialStackSize);
    const [turn , setTurn] = useState(0);
    const [moveCount , setMoveCount] = useState(0);

    function bot()
    {
        let bestMove = getBestMove([...board] , [...stackSize] , Number(moveCount));

        if(stackSize[bestMove - 1] >= 6) return;

        let newBoard = [...board];
        let ss = [...stackSize];

        newBoard[5 - ss[bestMove - 1]][bestMove - 1].val = "Y";
        ss[bestMove - 1] += 1;

        setMoveCount(moveCount + 1);
        setStackSize(ss);
        setBoard(newBoard);
    }

    useEffect(() => 
    {
        if(gameMode === 0) return;

        setTurn(1);
        setMoveCount(0);
        setStackSize(initialStackSize);
        setBoard(initialBoard);
    } , [gameMode]);

    useEffect(() => 
    {
        if(gameMode === 0) return;
        if(checkWinningMove([...board] , moveCount , turn) === true)
        {
            setGameMessage(turn === 1 ? "Player Red Won the Game" : "Player Yellow Won the Game");
            setGameMode(0);
            return;
        }

        if(moveCount === 6 * 7)
        {
            setGameMessage("It is a Draw!!");
            setGameMode(0);
            return;
        }

        if(moveCount != 0) setTurn(turn === 1 ? 2 : 1);
    } , [board]);

    useEffect(() => 
    {
        if(turn === 0 || gameMode === 0)
        {
            return;
        }
        if(turn === 2 && gameMode === 1)
        {
            bot();
        }

        if(turn === 1) setGameMessage("It is Player Red Turn Now");
        else if(turn === 2) setGameMessage("It is Player Yellow Turn Now");
    } , [turn]);

    function changeGameMode(e)
    {
        setGameMode(e.target.options.selectedIndex);
    }
    
    function makeMove(col)
    {
        if(stackSize[col - 1] == 6)
        {
            setGameMessage("Enter a Valid Column");
            return;
        }
        if(gameMode == 0)
        {
            setGameMessage("Select a Game Mode");
            return;
        }

        
        let newBoard = [...board];
        let stack = [...stackSize];
        newBoard[5 - stack[col - 1]][col - 1].val = (turn === 1 ? "R" : "Y");
        stack[col - 1] += 1;
        setMoveCount(moveCount + 1);
        setStackSize(stack);
        setBoard(newBoard);
    }

    function checkWinningMoveUtil(newBoard , target)
    {
        let count = 0 , r = 0 , c = 0;
        //Checking Rows
        for(let i = 0 ; i < 6 ; i++)
        {
            for(let j = 0 ; j < 7 ; j++)
            {
                r = i;
                c = j;
                count = 0;
                while(r < 6 && c < 7)
                {
                    if(newBoard[r][c].val.localeCompare(target) == 0) count += 1;
                    else break;
                    c += 1;
                }
                if(count >= 4) return true;
            }
        }

        //Checking Columns
        for(let i = 0 ; i < 6 ; i++)
        {
            for(let j = 0 ; j < 7 ; j++)
            {
                r = i;
                c = j;
                count = 0;
                while(r < 6 && c < 7)
                {
                    if(newBoard[r][c].val.localeCompare(target) == 0) count += 1;
                    else break;
                    r += 1;
                }
                if(count >= 4) return true;
            }
        }

        //Checking Primary Diagonal
        for(let i = 0 ; i < 6 ; i++)
        {
            for(let j = 0 ; j < 7 ; j++)
            {
                r = i;
                c = j;
                count = 0;
                while(r < 6 && c >= 0)
                {
                    if(newBoard[r][c].val.localeCompare(target) == 0) count += 1;
                    else break;
                    r += 1;
                    c -= 1;
                }
                if(count >= 4) return true;
            }
        }

        //Checking Alternate Diagonal
        for(let i = 0 ; i < 6 ; i++)
        {
            for(let j = 0 ; j < 7 ; j++)
            {
                r = i;
                c = j;
                count = 0;
                while(r < 6 && c < 7)
                {
                    if(newBoard[r][c].val.localeCompare(target) == 0) count += 1;
                    else break;
                    r += 1;
                    c += 1;
                }
                if(count >= 4) return true;
            }
        }

        return false;
    }

    function checkWinningMove(newBoard , mc , turn)
    {
        let target = turn == 1 ? "R" : "Y";
        return checkWinningMoveUtil(newBoard , target);
    }

    //------------------------------------------------------

    function getBestMoveUtil(nb , s , mc , t , depth)
    {
        if(mc === 6 * 7 || depth === 5)
        {
            return 0;
        }

        if(t === 1)
        {
            let mx = -9999;
            let tmp;
            for(let j = 0 ; j < 7 ; j++)
            {
                if(s[j] >= 6) continue;

                nb[5 - s[j]][j].val = "R";
                if(checkWinningMove(nb , Number(mc + 1) , Number(1)) === true)
                {
                    nb[5 - s[j]][j].val = "-";
                    return 1;
                    // return (5 - depth) * 1;
                }
                s[j] += 1;

                tmp = getBestMoveUtil(nb , s , Number(mc + 1) , Number(2) , Number(depth + 1));
                mx = mx >= tmp ? mx : tmp;

                s[j] -= 1;
                nb[5 - s[j]][j].val = "-";
            }
            return mx;
        }
        else if(t === 2)
        {
            let mn = 9999;
            let tmp;
            for(let j = 0 ; j < 7 ; j++)
            {
                if(s[j] >= 6) continue;

                nb[5 - s[j]][j].val = "Y";
                if(checkWinningMove(nb , Number(mc + 1) , Number(2)) === true)
                {
                    nb[5 - s[j]][j].val = "-";
                    return -1;
                    // return (5 - depth) * (-1);
                }
                s[j] += 1;

                tmp = getBestMoveUtil(nb , s , Number(mc + 1) , Number(1) , Number(depth + 1));
                mn = mn <= tmp ? mn : tmp;

                s[j] -= 1;
                nb[5 - s[j]][j].val = "-";
            }
            return mn;
        }
        return 0;
    }

    function getBestMove(newBoard , ss , mc)
    {
        let nb = JSON.parse(JSON.stringify(newBoard));
        let s = JSON.parse(JSON.stringify(ss));

        let mn = 99999;
        let tmp;
        let bestMove = 0;

        for(let j = 0 ; j < 7 ; j++)
        {
            if(s[j] >= 6) continue;

            nb[5 - s[j]][j].val = "Y";
            s[j] += 1;

            tmp = getBestMoveUtil(nb , s , Number(mc + 1) , Number(1) , Number(0));
            if(mn > tmp)
            {
                mn = tmp;
                bestMove = j;
            }

            s[j] -= 1;
            nb[5 - s[j]][j].val = "-";
        }

        return bestMove + 1;
    }


    //---------------------------------------------------

    return(
        <div className="container">
            <GameOptions changeGameMode = {changeGameMode}/>
            <GameMessage text = {gameMessage}/>
            <Board board = {board} columns = {columns} makeMove = {makeMove}/>
        </div>
    )
}

export default Container;