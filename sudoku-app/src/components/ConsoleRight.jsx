import React from 'react';

export default ({ consoleMessage, numberOfSolved, showFound }) => {

  return (
    <div>
      <br />
      <article className="message is-warning">
        <div className="message-header">
          <p>Analysis of the game</p>
        </div>

        <div className="message-body">
          {consoleMessage}
          
          <br/>
          
          <button className="button is-small is-success" onClick={showFound}>
            Show what you have found&nbsp;
          </button>
        </div>
      </article>

      <br />

      <article className="message is-warning">
        <div className="message-header">
          <p>Number of solved</p>
        </div>
        <div className="message-body">
          {numberOfSolved}
        </div>
      </article>
    </div>
  );

}