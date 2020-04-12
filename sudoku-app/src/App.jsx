import React from 'react';
import Banner from './components/Banner';
import Tools from './components/Tools';
import 'bulma/css/bulma.css';
import Board from './components/Board';
import config from './config';
import GameInfo from './components/GameInfo';
import ConsoleRight from './components/ConsoleRight';
import getRandomLevel from './Controls/getRandomLevel';

class App extends React.Component {

  get totalCells() {
    return config.N_ROWS * config.N_COLUMNS
  }

  get emptyBoard() {
    return new Array(this.totalCells).fill("");
  }

  get whiteBgColorBoard() {
    return new Array(this.totalCells).fill(".bg-white")
  }

  state = {
    cellsValue: this.emptyBoard,
    cellsBackgroundColor: this.whiteBgColorBoard,
    gameLevel: null,
    complexityLevel: null,
    complexityLog: 1,
    countEmptyCells: this.totalCells,
    consoleMessage: 'First message',
    numberOfSolved: 0,
    messageBoxBelowValue: ''
  };

  solve = () => {

  }
  stop = () => {

  }
  newGame = () => {
    const { board, dificult } = getRandomLevel();
    this.setState(
      {
        cellsValue: [...board],
        gameLevel: dificult,
        cellsBackgroundColor: this.whiteBgColorBoard,
        messageBoxBelowValue: config.FACE_FOR_DIFICULT[dificult]
      }
    );
  }
  deleteGame = () => {
    this.setState(
      {
        cellsValue: this.emptyBoard,
        cellsBackgroundColor: this.whiteBgColorBoard,
        gameLevel: '',
        messageBoxBelowValue: ''
      }
    );
  }
  getBoardCoords = () => {
    let strCoords = "[";

    this.state
      .cellsValue
      .forEach((value, i) => {
        const column = i % config.N_COLUMNS;
        const row = Math.floor(i / config.N_ROWS);
        if (value) {
          strCoords += `[${value},${row},${column}],`
        }
      });
    const messageBoxBelowValue = strCoords.slice(0, -1) + "]";

    this.setState({ messageBoxBelowValue });
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
              getBoardCoords={this.getBoardCoords}
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
                  <div className="column">
                    <ConsoleRight
                      consoleMessage={this.state.consoleMessage}
                      numberOfSolved={this.state.numberOfSolved}
                      showFound={this.handleShowFound}
                    />
                    {
                      this.state.messageBoxBelowValue &&
                      <div className="has-text-centered is-size-4 messageBoxBelow" dangerouslySetInnerHTML={{__html:this.state.messageBoxBelowValue}}>
                      </div>
                    }
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
