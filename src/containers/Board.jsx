import React from 'react'
import Square from '../components/Square'
import Confetti from 'react-dom-confetti';



function Board({ xIsNext, squares, onPlay, showConfetti, setShowConfetti, confettiRef }) {


    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
      
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
          ) {
            return {
              winner: squares[a],
              line: [a, b, c]
            };
          }
        }
      
        if (squares.every(square => square !== null)) {
          return {
            winner: "Cat's Game",
            line: []
          };
        }
      
        return null;
      }

    function handleClick(i) {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      onPlay(nextSquares);
    }
  
    const winningLine = calculateWinner(squares);
    let status;
    if (winningLine) {
        status = "Winner: " + winningLine.winner;
        setShowConfetti(true);
      } else if (squares.every(square => square !== null)) {
        status = "Cat's game";
        setShowConfetti(false);
      } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
        setShowConfetti(false);
      }
      
  
    function renderSquare(i) {
      const isWinningSquare = winningLine && winningLine.line.includes(i);
      return (
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          isWinningSquare={isWinningSquare}
        />
      );
    }
    
    
  
    return (
      <>
        <div className="heading">Tic-Tac-Toe</div>
        <div className="status">{status}</div>
        <div className="board">
          {[0, 1, 2].map(row => (
            <div key={row} className="board-row">
              {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
            </div>
          ))}
        </div>
        <div className="confetti"><Confetti
        active={showConfetti}
        ref={confettiRef}
        config={{
            angle: 90,
            spread: 360,
            startVelocity: 40,
            elementCount: 200,
            dragFriction: 0.1,
            duration: 2000,
            delay: 0,
            colors: ['#bc13fe', '#0c8eff', '#00ff96', '#ffdb00', '#ff007f']
        }}
        />
        </div>
      </>
    );
  }

  export default Board