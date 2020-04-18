import React from 'react';

export default (props) => {
  const { solve, stop, newGame, deleteGame, getBoardCoords, goBack,
    showRelatedCells, toggleShowRelatedCells,
    isStoped } = props;

  return (
    <div className="container">
      <div className="field is-grouped">
        <p className="control">
          <button className="button is-small is-link" onClick={solve}>Solve</button>
        </p>

        <p className="control">
          <button className={`button is-small ${isStoped ? 'is-success' : 'is-warning'}`} onClick={stop}>{isStoped ? 'Unblock' : 'Stop'}</button>
        </p>

        <p className="control">
          <button className="button is-small is-success" onClick={newGame}>New game</button>
        </p>

        <p className="control">
          <button className="button is-small is-danger" onClick={deleteGame}>Delete</button>
        </p>

        <p className="control">
          <button className="button is-small is-info" onClick={getBoardCoords}>Get this</button>
        </p>

        <p className="control">
          <button className="button is-small is-warning" onClick={goBack}>Go back</button>
        </p>
      </div>
      <div className="field">
        <input id="showRelatedCells" type="checkbox" onChange={toggleShowRelatedCells} checked={showRelatedCells} />
        <label htmlFor="showRelatedCells">Show related cells </label>
      </div>
    </div>
  )
}