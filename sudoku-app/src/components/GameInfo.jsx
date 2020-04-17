import React from 'react';
import config from '../config';

const GameInfo = ({ gameLevel, complexityLevel, complexityLog, countEmptyCells }) => {
  const cName = gameLevel && config.CLASS_FOR_DIFICULT[gameLevel];

  return (
    <div>
      <br />
      <article className="panel is-white">
        <p className="panel-heading">Game info</p>
        <p className="panel-tabs">
          <a href="#" className="is-active">as</a>
          <a href="#">as</a>
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input type="text" className="input is-primary" placeholder="Search" />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <a className="panel-block">
          {
            gameLevel ?
              <span className={`tag is-large ${cName}`}>{gameLevel}</span>
              : <span className={`tag is-large`}>Waiting for new game</span>
          }
        </a>
        <a className="panel-block">
          <span className="panel-icon"><i className="fas fa-border-all" aria-hidden="true"></i></span>
          Empty cells: {countEmptyCells}
        </a>
        <a className="panel-block">
          <span className="panel-icon"><i className="fas fa-drafting-compass" aria-hidden="true"></i></span>
          Complexity: {complexityLevel}
        </a>
        <a className="panel-block">
          <span className="panel-icon"><i className="fas fa-drafting-compass" aria-hidden="true"></i></span>
          Complexity log: {complexityLog}
        </a>
      </article>
      <br />
      <br />
      <br />
    </div>
  );
}

export default GameInfo;