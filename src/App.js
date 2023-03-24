import React, { useState, useEffect } from 'react';
import './App.css';

const BOARD_SIZE = 100;
const MAX_ROLL = 6;
const LADDERS = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  71: 91
};
const SNAKES = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 36,
  93: 73,
  95: 75,
  99: 78
};

function App() {
  const [playerPos, setPlayerPos] = useState([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceRoll, setDiceRoll] = useState(1);
  const [winner, setWinner] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (playerPos[currentPlayer - 1] === BOARD_SIZE) {
      setWinner(currentPlayer);
    }
  }, [playerPos, currentPlayer]);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * MAX_ROLL) + 1;
    setDiceRoll(roll);
    const newPos = playerPos[currentPlayer - 1] + roll;
    if (newPos <= BOARD_SIZE) {
      setPlayerPos(prev => [
        ...prev.slice(0, currentPlayer - 1),
        newPos,
        ...prev.slice(currentPlayer)
      ]);
      if (LADDERS[newPos]) {
        setTimeout(() => {
          setPlayerPos(prev => [
            ...prev.slice(0, currentPlayer - 1),
            LADDERS[newPos],
            ...prev.slice(currentPlayer)
          ]);
          setMessage(`Player ${currentPlayer} climbed a ladder to square ${LADDERS[newPos]}`);
        }, 500);
      }
      if (SNAKES[newPos]) {
        setTimeout(() => {
          setPlayerPos(prev => [
            ...prev.slice(0, currentPlayer - 1),
            SNAKES[newPos],
            ...prev.slice(currentPlayer)
          ]);
          setMessage(`Player ${currentPlayer} landed on a snake and moved to square ${SNAKES[newPos]}`);
        }, 500);
      }
      setMessage(`Player ${currentPlayer} moved ${roll} step${roll > 1 ? 's' : ''} to square ${newPos}`);
    }
    setCurrentPlayer(prev => prev === 1 ? 2 : 1);
  };

  const resetGame = () => {
    setPlayerPos([0, 0]);
    setCurrentPlayer(1);
    setDiceRoll(1);
    setWinner(false);
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Snake and Ladder Game</h1>
      <div className="board">
        {Array.from({ length: BOARD_SIZE }, (_, i) => i + 1).map((pos    , index) => (
      <div className="square" key={index}>
        {pos === playerPos[0] && <div className="player1"></div>}
        {pos === playerPos[1] && <div className="player2"></div>}
        {LADDERS[pos] && <div className="ladder"></div>}
        {SNAKES[pos] && <div className="snake"></div>}
        <div className="pos">{pos}</div>
      </div>
    ))}
  </div>
  <div className="game-info">
    <div className="current-player">Current player: {currentPlayer}</div>
    <div className="dice-roll">Dice roll: {diceRoll}</div>
    {message && <div className="message">{message}</div>}
    {winner && <div className="winner">Player {winner} wins!</div>}
    <button onClick={rollDice} disabled={winner}>Roll Dice</button>
    <button onClick={resetGame}>Reset Game</button>
  </div>
</div>
  )
        }
        export default App
