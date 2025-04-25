import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const choices = ["Rock", "Paper", "Scissors"];
  const [player, setPlayer] = useState('');
  const [computer, setComputer] = useState('');
  const [result, setResult] = useState('');
  const [chances, setChances] = useState(0);

  const playGame = (playerChoice) => {
    if (chances >= 3) return;

    const compChoice = choices[Math.floor(Math.random() * 3)];
    setPlayer(playerChoice);
    setComputer(compChoice);

    if (playerChoice === compChoice) {
      setResult('It\'s a Tie!');
    } else if (
      (playerChoice === 'Rock' && compChoice === 'Scissors') ||
      (playerChoice === 'Paper' && compChoice === 'Rock') ||
      (playerChoice === 'Scissors' && compChoice === 'Paper')
    ) {
      setResult('You Win!!!');
    } else {
      setResult('You Lose!!!');
    }
    setChances(prev => prev + 1);
  }

  useEffect(() => {
    if (chances === 3) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [chances]);

  return (
    <div className="game-container">
      <h1>Rock-Paper-Scissors</h1>
      <div className="buttons-container">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => playGame(choice)}
            disabled={chances >= 3}
            className="game-button"
          >
            {choice}
          </button>
        ))}
      </div>
      <p>Chances Left: {3 - chances}</p>
      <div className="result-container">
        <p className="game-result">{result}</p>
        <p className="choices">
          You: <span className="player-choice">{player}</span><br />
          Computer: <span className="computer-choice">{computer}</span>
        </p>
      </div>
      {chances === 3 && <p className="game-over">Game Over! Refreshing...</p>}
    </div>
  );
}

export default App;
