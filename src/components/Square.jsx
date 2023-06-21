import React from 'react'

function Square({ value, onSquareClick, isWinningSquare }) {
    const squareClass = isWinningSquare ? "square winning" : "square";
    return (
      <button 
        className={squareClass}
        onClick={onSquareClick}
        >
        {value}
      </button>
    );
  }

  export default Square