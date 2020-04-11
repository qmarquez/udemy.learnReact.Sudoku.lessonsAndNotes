import React from 'react';
import Banner from './components/Banner';
import Tools from './components/Tools';
import 'bulma/css/bulma.css';
import Board from './components/Board';
import config from './config';
import GameInfo from './components/GameInfo';
import NewGame from './Controls/NewGame';
import ConsoleRight from './components/ConsoleRight';

class App extends React.Component {

  state = {
    cellsValue: new Array(config.N_ROWS * config.N_COLUMNS).fill(""),
    cellsBackgroundColor: new Array(config.N_ROWS * config.N_COLUMNS).fill(".bg-white"),
    gameLevel: null,
    complexityLevel: null,
    complexityLog: 1,
    countEmptyCells: config.N_ROWS * config.N_COLUMNS,
    consoleMessage: 'First message',
    numberOfSolved: 0
  };

  solve = () => {

  }
  stop = () => {

  }
  newGame = () => {
    const newGame = NewGame.getRandomLevel();
    this.setState(
      {
        cellsValue: [...newGame.board],
        gameLevel: newGame.dificult
      }
    );
  }
  deleteGame = () => {

  }
  getThisAsStr = () => {

  }
  goBack = () => {

  }
  handleChange = () => {

  }
  handleFocus = () => {

  }
  handleShowFound = () => { 

  }
  sendConsole = () => { 

  }

  render() {
    return (<div>
      <section className="hero is-fullheight">
        <div className="container is-fluid">
          <Banner />
          <div className="container">
            <Tools
              solve={this.solve}
              stop={this.stop}
              newGame={this.newGame}
              deleteGame={this.deleteGame}
              getThisAsStr={this.getThisAsStr}
              goBack={this.goBack} />
          </div>
          <div className="container">
            <div className="columns">
              <div className="column">
                <Board
                  handleChange={this.handleChange}
                  handleFocus={this.handleFocus}
                  cellsValue={this.state.cellsValue}
                  cellsBackgroundColor={this.state.cellsBackgroundColor} />
              </div>
              <div className="column">
                <GameInfo
                  gameLevel={this.state.gameLevel}
                  complexityLevel={this.state.complexityLevel}
                  complexityLog={this.state.complexityLog}
                  countEmptyCells={this.state.countEmptyCells}
                />
              </div>
              <div className="column">
                <div className="columns">
                  <div className="row">
                    <div className="column">
                      <ConsoleRight
                        consoleMessage={this.state.consoleMessage}
                        numberOfSolved={this.state.numberOfSolved}
                        showFound={this.handleShowFound}
                      />
                    </div>
                    <div className="column">Input Box</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>Sudoku game with React 2020</p>
          </div>
        </footer>
      </section>
    </div >
    );
  }
}

export default App;
