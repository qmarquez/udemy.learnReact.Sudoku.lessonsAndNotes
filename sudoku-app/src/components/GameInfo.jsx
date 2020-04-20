import React from 'react';
import config from '../config';

const GameInfo = ({ gameLevel, complexityLevel, complexityLog, countEmptyCells }) => {
  const cName = gameLevel && config.CLASS_FOR_DIFICULT[gameLevel];

  return (
    <div>
      <br />
      <article className="panel is-white">
        <p className="panel-heading">Game info</p>
        <button className="game-info-row panel-block">
          {
            gameLevel ?
              <span className={`tag is-large ${cName}`}>{gameLevel}</span>
              : <span className={`tag is-large`}>Waiting for new game</span>
          }
        </button>
        <button className="game-info-row panel-block">
          <span className="panel-icon"><i className="fas fa-border-all" aria-hidden="true"></i></span>
          Empty cells: {countEmptyCells}
        </button>
        <button className="game-info-row panel-block">
          <span className="panel-icon"><i className="fas fa-drafting-compass" aria-hidden="true"></i></span>
          Complexity: {complexityLevel}
        </button>
        <button className="game-info-row panel-block">
          <span className="panel-icon"><i className="fas fa-drafting-compass" aria-hidden="true"></i></span>
          Complexity log: {complexityLog}
        </button>
      </article>
      <br />
      <br />
      <br />
    </div>
  );
}

export default GameInfo;