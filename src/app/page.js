"use client";
import Image from "next/image";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="w-20 h-20 text-3xl font-bold flex items-center justify-center border border-gray-500 hover:border-gray-700"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ isNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (isNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' +(isNext? 'X' : 'O');
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    setIsNext(!isNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsNext(!isNext);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-32">
      <h1 className="text-5xl font-bold mb-6">Tic Tac Toe</h1>
      <Board isNext={isNext} squares={squares} onPlay={handlePlay} />
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" onClick={resetGame}>Reset</button>
    </main>
  );
}

