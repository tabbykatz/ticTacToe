import React, { useState } from 'react';
import { calculateWinner } from '../helpers.js';
import Board from './Board';

const styles = {
  textAlign: 'center',
  // width: '200px',
  //margin: '20px auto',
}
const Game = () => {
const [history, setHistory] = useState([Array(9).fill(null)]);
const [stepNumber, setStepNumber] = useState(0);
const [xIsNext, setXisNext] = useState('true');
const winner = calculateWinner(history[stepNumber]);

const handleClick = (i) => {
  const timeInHistory = history.slice(0, stepNumber + 1);
  const current = timeInHistory[stepNumber];
  const squares = [...current];
  //when user clicks a square that is already used or game is won, return
  if (winner || squares[i]) return;
  squares[i] = xIsNext ? 'X' : '0';
  setHistory([...timeInHistory, squares]);
  setStepNumber(timeInHistory.length);
  setXisNext(!xIsNext);
};

const jumpTo = (step) => {
  setStepNumber(step);
  setXisNext(step % 2 === 0)
};

const renderMoves = () => (
  history.map((_step, move) => {
    const destination = move ? `Go back by ${move}` : 'Go to beginning';
    return (
      <li key={move}>
        <button className='timetravel' onClick={() => jumpTo(move)}>{destination}</button>
      </li>
    )
  })
  )


    return (
      <>

      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div style={styles}>
        <p>{winner ? winner + ' wins!': 'It\'s ' + (xIsNext ? 'X' : 'O') + `'s turn`}</p>
        {renderMoves()}
      </div>
    </>
  )
};


  export default Game;
