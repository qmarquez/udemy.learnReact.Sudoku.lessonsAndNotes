import React from 'react';
import Banner from './components/Banner';
import Tools from './components/Tools';
import 'bulma/css/bulma.css';
import Board from './components/Board';
import config from './config';
import GameInfo from './components/GameInfo';
import ConsoleRight from './components/ConsoleRight';
import getRandomLevel from './Controls/getRandomLevel';
import _ from 'lodash';

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

  cellInfo(cell_IdOrIndex, value) {
    const [row, column] = typeof cell_IdOrIndex === 'string' ?
      [
        parseInt(cell_IdOrIndex[0]) - 1,
        parseInt(cell_IdOrIndex[1]) - 1
      ] : [
        Math.floor(cell_IdOrIndex / config.N_ROWS),
        Math.floor(cell_IdOrIndex % config.N_COLUMNS)
      ];
    const indexCell = typeof cell_IdOrIndex === 'number' ? cell_IdOrIndex : row * 9 + column;

    const cubeRow = Math.floor((row) / 3);
    const cubeColumn = Math.floor((column) / 3)
    const cubeIndex = cubeRow * 3 + cubeColumn;

    return { row, column, indexCell, cubeIndex, iValue: parseInt(value, 10) };
  }

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
  handleChange = ({ target: { id, value } }) => {
    // When user insert a new value:
    const { indexCell, row, column, iValue } = this.cellInfo(id, value);
    const cellsValue = [...this.state.cellsValue];

    cellsValue[indexCell] = value;

    if ((value === "") || (iValue > 0 && iValue <= Math.max(config.N_ROWS, config.N_COLUMNS))) {
      const consoleMessage = `Cell filled { ROW: ${row}, COLUMN: ${column} } [VALUE: ${value}]`;
      this.setState({ cellsValue, consoleMessage });
    }
  }
  handleFocus = ({ target: { id, value } }) => {
    // Color connected cells
    const {
      row: focusedRow,
      column: focusedColumn,
      cubeIndex: focusedCubeIndex,
      iValue
    } = this.cellInfo(id, value);

    const relatedCells = [];
    const cellsBackgroundColor = this.emptyBoard
      .map(
        (value, index) => {
          const { row, column, cubeIndex } = this.cellInfo(index);
          let finalBg = 'bg-white';
          if (row === focusedRow && column === focusedColumn) {
            finalBg = 'bg-aqua';
          } else if (row === focusedRow || column === focusedColumn || cubeIndex === focusedCubeIndex) {
            finalBg = 'bg-coral';
          }

          if (finalBg !== 'bg-white') {
            relatedCells.push(parseInt(this.state.cellsValue[index], 10));
          }

          return finalBg;
        }
      );

    // Show cell info
    if (iValue) {
      this.sendConsole(`Cell filled { ROW: ${focusedRow}, COLUMN: ${focusedColumn} } [VALUE: ${iValue}]`);
    } else {
      // Calc available values for that cell
      const availableValues = _.difference(config.AVAILABLE_VALUES, relatedCells);

      this.sendConsole(`{ ROW: ${focusedRow}, COLUMN: ${focusedColumn} } [${availableValues.toString()}]`)
    }

    this.setState({ cellsBackgroundColor });
  }

  handleShowFound = () => {

  }
  sendConsole = (consoleMessage) => {
    this.setState({ consoleMessage });
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
                      <div className="has-text-centered is-size-4 messageBoxBelow" dangerouslySetInnerHTML={{ __html: this.state.messageBoxBelowValue }}>
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
