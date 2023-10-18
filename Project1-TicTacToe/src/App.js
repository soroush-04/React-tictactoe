
import { useState } from "react";

export default function Game(){

  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentHistory = history[history.length - 1];

  function handlePlay (copySquares) {
    setHistory([...history, copySquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove){
    //
  }

  const moves = history.map((squares, move) => {

    let moveInfo;
    if (move > 0){
      moveInfo = 'Go to move #' + move;
    }
    else{
      moveInfo = "Go to the start point";
    }

    return(
      <li>
        <button onClick={() => jumpTo(move)}> {moveInfo} </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentHistory} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol> {moves} </ol>
      </div>
    </div>
  );
}

/////////////
function Board({xIsNext, squares, onPlay}) {

  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is " + winner;
  }
  else {
    status = "Next player is " + (xIsNext ? "X" : "O");
  }

  function handleClick(i){

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const copySquares = squares.slice(); // make a copy of squares array
    // const copySquares = Array.from(squares);
    
    if (xIsNext) {
      copySquares[i] = 'X';
    } 
    else {
      copySquares [i] = 'O';
    }

    onPlay(copySquares);
  }

  return (
  <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>

    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>

    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
  </>
  );
}

////////////////
function Square({value, onSquareClick}){

  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

///////////////
function calculateWinner(squares){
  const wLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i=0; i < wLines.length; i++){
    const [a,b,c] = wLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

