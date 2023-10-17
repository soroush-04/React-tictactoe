
import { useState } from "react";

export default function Board() {
  return (
  <>
  <div className="board-row">
    <Square />
    <Square />
    <Square />
  </div>

  <div className="board-row">
    <Square />
    <Square />
    <Square />
  </div>

  <div className="board-row">
    <Square />
    <Square />
    <Square />
  </div>
  </>
  );
}

function Square(){

  const [value, setValue] = useState(1);

  function handleClick(){
    setValue('X')
  }
  return (
    <button className="square" onClick={handleClick}>{value}</button>
  );
}
