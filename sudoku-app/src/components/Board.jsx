import React from 'react';
import BoardRow from './BoardRow';
import config from '../config';

export default (props) => {

  const renderedBoard = [];

  for (let row = 0; row < config.N_ROWS; row++) {
    renderedBoard.push(
      <BoardRow key={row} rowNumber={row} {...props} />
    );
  }

  return (
    <div className="container">
      <hr />
      <div className="card">
        <table className="board">
          <tbody>
            {renderedBoard}
          </tbody>
        </table>
      </div>
      <hr />
    </div>
  )
}