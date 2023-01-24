import React, { useState, useEffect } from "react";
const huPlayer = 'X';
const aiPlayer = 'O';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

function evaluateBoard(board: (boolean | null)[], depth: number){
    let result: (number | null) = null;

    for (let i = 0; i < winCombos.length; i++) {
        if (board[winCombos[i][0]] == board[winCombos[i][1]] && board[winCombos[i][1]] == board[winCombos[i][2]]) {
            if (board[winCombos[i][0]] == true){
                result = -10 + depth;
            }else if(board[winCombos[i][0]] == false){
                result = 10 - depth;
            }
        }
    }
    var movesLeft = 0;
    for (let i = 0; i < board.length; i++) {
        board[i] == null && movesLeft++;
    }
    if (movesLeft == 0 && result == null) {
        result = 0;
    }
    return result;
}

function minimax(board: (boolean | null)[], depth: number, isMax: boolean){
    
    var score = evaluateBoard(board, depth);
    if (score != null){
        return score;
    }

    if (isMax) {
        var bestVal = -1000;
        for (var i = 0; i < board.length; i++) {
            if(board[i] == null){
                board[i] = false;
                var value = minimax(board, depth+1, !isMax);
                
                if (value > bestVal){
                    bestVal = value;
                }
                board[i] = null;
            }
        }
        return bestVal;
    } else {
        var bestVal = 1000;
        for (var i = 0; i < board.length; i++) {
            if(board[i] == null){
                board[i] = true;
                var value = minimax(board, depth+1, !isMax);
                
                if (value < bestVal){
                    bestVal = value;
                }
                board[i] = null;
            }
        }
        return bestVal;
    }
}

function getBestMove(board: (boolean | null)[]){
    let bestVal = -1000;
    let bestMove = 0;

    for (let i = 0; i < board.length; i++) {
        if(board[i] == null){
            
            board[i] = false;
            let moveVal = minimax(board, 0, false);
            board[i] = null;

            if (moveVal > bestVal)
            {
                bestVal = moveVal;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

export default function TicTacToe() {

    const [boardArr, setBoardArr] = useState<(boolean | null)[]>([null, null, null, null, null, null, null, null, null]);
    const [player, setPlayer] = useState(true);
    const [winner, setWinner] = useState<(boolean | null | undefined)>(null);
    const [aiOn, setAi] = useState(true);

    function movesLeft(){
        var result = 0;
        for (let i = 0; i < boardArr.length; i++) {
            boardArr[i] == null && result++;
        }
        return result;
    }

    function aiTurn(){
        setTimeout(() => {
            if(winner == null && player == false && movesLeft() > 0){
                var tempBoard = boardArr;
                tempBoard[getBestMove(boardArr)] = player;
                setBoardArr(tempBoard);
                setPlayer(!player);
            }
        }, 250);
    }

    useEffect(() => {
        let result: (boolean | null | undefined) = null;
        for (let i = 0; i < winCombos.length; i++) {
            if (boardArr[winCombos[i][0]] == boardArr[winCombos[i][1]] && boardArr[winCombos[i][1]] == boardArr[winCombos[i][2]]) {
                result = boardArr[winCombos[i][0]];
                //break;
            }
        }
        var movesLeft = 0;
        for (let i = 0; i < boardArr.length; i++) {
            boardArr[i] == null && movesLeft++;
        }
        if (movesLeft == 0 && result == null) {
            result = undefined;
        }
        setWinner(result);
        aiOn && aiTurn();
    }, [JSON.stringify(boardArr)]); // Only re-run the effect if board changes
    
    const tileClk = (tile: number) => {
        if (boardArr[tile] == null){
            var tempBoard = boardArr;
            if (aiOn){
                if(player){
                    tempBoard[tile] = player
                    setBoardArr(tempBoard);
                    setPlayer(!player);
                }
            }else{
                tempBoard[tile] = player;
                setBoardArr(tempBoard);
                setPlayer(!player);
            }
        }
    }

    const restartGame = () =>{
        var newBoard: (boolean | null)[] = [null, null, null, null, null, null, null, null, null];
        setBoardArr(newBoard);
        setWinner(null);
        setPlayer(true);
    }

    return (
        <div className="relative flex flex-col w-fit justify-center bg-slate-800 bg-opacity-20 rounded-md shadow-lg text-center">
            <div className="grid grid-cols-3 hover:cursor-pointer m-5">
                <div onClick={(e)=>tileClk(0)} className="cell p-1 w-20 h-20 border-r-2 border-b-2 border-black">
                    {
                        boardArr[0] !== null &&
                        <h1 className="font-bold text-6xl">{boardArr[0] === true ? huPlayer : aiPlayer}</h1>
                    }
                </div>
                <div onClick={(e)=>tileClk(1)} className="cell p-1 w-20 h-20 border-r-2 border-l-2 border-b-2 border-black">
                    {
                        boardArr[1] !== null &&
                        <h1 className="font-bold text-6xl">{boardArr[1] === true ? huPlayer : aiPlayer}</h1>
                    }
                </div>
                <div onClick={(e)=>tileClk(2)} className="cell p-1 w-20 h-20 border-l-2 border-b-2 border-black">
                    {
                        boardArr[2] !== null &&
                        <h1 className="font-bold text-6xl">{boardArr[2] === true ? huPlayer : aiPlayer}</h1>
                    }
                </div>
                <div onClick={(e)=>tileClk(3)} className="cell p-1 w-20 h-20 border-r-2 border-t-2 border-b-2 border-black">
                    {
                        boardArr[3] !== null &&
                        <h1 className="font-bold text-6xl">{boardArr[3] === true ? huPlayer : aiPlayer}</h1>
                    }
                </div>
                <div onClick={(e)=>tileClk(4)} className="cell p-1 w-20 h-20 border-2 border-black">
                    {
                        boardArr[4] !== null &&
                        <h1 className="font-bold text-6xl">{boardArr[4] === true ? huPlayer : aiPlayer}</h1>
                    }
                </div>
                <div onClick={(e)=>tileClk(5)} className="cell p-1 w-20 h-20 border-l-2 border-t-2 border-b-2 border-black">
                    {
                        boardArr[5] !== null &&
                        <h1 className="font-bold text-6xl">{boardArr[5] === true ? huPlayer : aiPlayer}</h1>
                    }
                </div>
                <div onClick={(e)=>tileClk(6)} className="cell p-1 w-20 h-20 border-r-2 border-t-2 border-black">
                    {
                        boardArr[6] !== null &&
                        <h1 className="font-bold text-6xl">{boardArr[6] === true ? huPlayer : aiPlayer}</h1>
                    }
                </div>
                <div onClick={(e)=>tileClk(7)} className="cell p-1 w-20 h-20 border-r-2 border-l-2 border-t-2 border-black">
                    {
                        boardArr[7] !== null &&
                        <h1 className="font-bold text-6xl">{boardArr[7] === true ? huPlayer : aiPlayer}</h1>
                    }
                </div>
                <div onClick={(e)=>tileClk(8)} className="cell p-1 w-20 h-20 border-l-2 border-t-2 border-black">
                    {
                        boardArr[8] !== null &&
                        <h1 className="font-bold text-6xl">{boardArr[8] === true ? huPlayer : aiPlayer}</h1>
                    }
                </div>
            </div>
            <div className="flex justify-center mb-1">
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={aiOn}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            setAi(!aiOn);
                        }}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    ></div>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                        { aiOn ? "AI on":"AI off"}
                    </span>
                </label>
            </div>
            {
                winner === undefined ?
                    <div className="absolute inset-0 text-7xl">
                        <div className="absolute inset-0 bg-slate-800 rounded-lg shadow-lg opacity-60 w-full h-full z-10"></div>

                        <div className="z-20 absolute inset-0">
                            <h1 className="text-white font-bold">Tie</h1>
                            <button onClick={restartGame} className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg duration-200">Play again</button>
                        </div>
                    </div>
                    : winner !== null &&
                    <div className="absolute inset-0 text-7xl">
                        <div className="absolute inset-0 bg-slate-800 rounded-lg shadow-lg opacity-60 w-full h-full z-10"></div>

                        <div className="z-20 absolute inset-0">
                            <h1 className="text-white font-bold" > {winner ? huPlayer : aiPlayer} won </h1>
                            <button onClick={restartGame} className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg duration-200">Play again</button>
                        </div>
                    </div>

            }
        </div>

    )
}
