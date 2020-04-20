import React from 'react';
import Banner from './components/Banner';
import Tools from './components/Tools';
import 'bulma/css/bulma.css';
import Board from './components/Board';
import config from './config';
import GameInfo from './components/GameInfo';
import ConsoleRight from './components/ConsoleRight';
import getRandomLevel from './lib/getRandomLevel';
import cellInfo from './lib/cellInfo';
import getRelatedCells from './lib/getRelatedCells';
import solveAlgorithm_1 from './lib/solveAlgorithm_1';
import solveAlgorithm_2 from './lib/solveAlgorithm_2';
import solveAlgorithm_3 from './lib/solveAlgorithm_3';
import gameInfo from './lib/gameInfo';

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
    consoleMessage: '',
    numberOfSolved: 0,
    messageBoxBelowValue: '',
    showRelatedCells: true,
    focusedCellRelatedCells: [],
    movementsHistory: [this.emptyBoard],
    stop: false,
    foundItemsStore: []
  };

  calcGameInfo = (board = this.state.cellsValue) => gameInfo(board);

  solve = (useSafeQuantity = true) => {
    if (this.state.stop) { return; }
    const safeBoard = [...this.state.cellsValue];
    let values;

    values = solveAlgorithm_1(safeBoard);
    this.updateBoardWithFoundedValues(values);
    if (values.length) { return; }

    values = solveAlgorithm_2(safeBoard);
    this.updateBoardWithFoundedValues(values);
    if (values.length) { return; }

    values = solveAlgorithm_3(safeBoard, useSafeQuantity);
    this.updateBoardWithFoundedValues(values);
    if (values.length) { return; }
  }

  updateBoardWithFoundedValues = (values) => {
    values.forEach(
      ({ cellIndex, value }) => {
        const { row, column, iValue, cellId } = cellInfo(cellIndex, value);
        this.updateBoard({ cellIndex, row, column, value, iValue, cellId });
      }
    );

    if (values.length) {
      setTimeout(this.solve, 500);
    }
  }

  stop = () => {
    this.setState({ stop: !this.state.stop });
  }

  newGame = () => {
    const { board, dificult } = getRandomLevel();
    const { countEmptyCells, complexityLevel, complexityLog } = this.calcGameInfo(board);
    this.setState(
      {
        cellsValue: [...board],
        gameLevel: dificult,
        cellsBackgroundColor: this.whiteBgColorBoard,
        messageBoxBelowValue: config.FACE_FOR_DIFICULT[dificult],
        countEmptyCells,
        complexityLevel,
        complexityLog,
        movementsHistory: [board]
      }
    );
  }

  deleteGame = () => {
    this.setState(
      {
        cellsValue: this.emptyBoard,
        cellsBackgroundColor: this.whiteBgColorBoard,
        gameLevel: '',
        messageBoxBelowValue: '',
        countEmptyCells: this.totalCells,
        movementsHistory: [this.emptyBoard]
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
    const movementsHistory = [...this.state.movementsHistory];
    if (movementsHistory.length > 1) {
      const cellsValue = movementsHistory.pop();
      this.setState({ cellsValue, cellsBackgroundColor: this.whiteBgColorBoard, movementsHistory });
    } else {
      this.sendConsole('Beginning of game');
    }
  }

  generateNewCompleteBoard = () => {
    this.deleteGame();
    this.solve(true);
  }

  handleChange = ({ target: { id, value } }) => {
    // When user insert a new value:
    debugger;
    const { cellIndex, row, column, iValue, cellId } = cellInfo(id, value);
    const isUsedValue = this.state
      .focusedCellRelatedCells
      .map(({ value }) => value)
      .includes(iValue);

    if (value === "" || (iValue > 0 && iValue <= Math.max(config.N_ROWS, config.N_COLUMNS) && !isUsedValue)) {
      this.updateBoard({ cellIndex, row, column, value, iValue, cellId }, true);
    } else {
      // highlight error cells
      const cellsBackgroundColor = this.state.showRelatedCells ? this.state.cellsBackgroundColor : this.whiteBgColorBoard;
      this.state
        .focusedCellRelatedCells
        .forEach(
          ({ index, value }) => {
            if (value === iValue) {
              cellsBackgroundColor[index] = 'bg-coral'
            }
          }
        );

      this.setState({ cellsBackgroundColor });
    }
  }

  updatingBoard
  async updateBoard({ cellIndex, row, column, value, iValue, cellId }, moveFocus = false) {
    if (this.updatingBoard) {
      await this.updatingBoard;
    }
    this.updatingBoard = new Promise(resolve => {
      let consoleMessage = `Cell filled { row: ${row}, column: ${column} } [value: ${value}]`;
      const cellsValue = [...this.state.cellsValue];

      // Save history
      const movementsHistory = [...this.state.movementsHistory];
      movementsHistory.push([...cellsValue]);

      // Update board
      cellsValue[cellIndex] = iValue || "";

      const { countEmptyCells, complexityLog, complexityLevel } = this.calcGameInfo(cellsValue);
      if (countEmptyCells === 0) {
        consoleMessage = config.FULLY_GAME_SOLVED_MESSAGE;
      }


      const foundItemsStore = [...this.state.foundItemsStore, { id: cellId, iValue }];

      this.setState(
        { cellsValue, consoleMessage, movementsHistory, countEmptyCells, complexityLog, complexityLevel, foundItemsStore },
        () => {
          resolve();
          if (moveFocus) {
            const nextId = this.state.cellsValue.indexOf("", cellIndex === this.totalCells - 1 ? 0 : cellIndex);
            const { row, column } = cellInfo(nextId);
            return document.getElementById(`${row + 1}${column + 1}`)?.focus();
          }
        }
      );
    })
  }

  handleFocus = ({ target: { id, value } }) => {
    // Color connected cells
    const {
      row,
      column,
      cubeIndex,
      iValue,
      cellIndex
    } = cellInfo(id, value);

    const { relatedCells, availableValues } = getRelatedCells({ row, column, cubeIndex }, this.state.cellsValue);

    const cellsBackgroundColor = this.whiteBgColorBoard;
    if (this.state.showRelatedCells) {
      relatedCells.forEach(({ cellIndex }) => cellsBackgroundColor[cellIndex] = 'bg-coral');
      cellsBackgroundColor[cellIndex] = 'bg-aqua';
    }

    // Show cell info;
    let consoleMessage;
    if (iValue) {
      consoleMessage = `Cell filled { row: ${row}, column: ${column} } [value: ${iValue}]`;
    } else {
      consoleMessage = `{ row: ${row}, column: ${column} } [${availableValues.toString()}]`;
    }

    this.sendConsole(consoleMessage);
    this.setState({ cellsBackgroundColor, focusedCellRelatedCells: relatedCells });
  }

  handleShowFound = () => {
    this.sendConsole(JSON.stringify(this.state.foundItemsStore));
  }

  sendConsole = (consoleMessage) => {
    this.setState({ consoleMessage });
  }

  toggleShowRelatedCells = () => {
    this.setState({ showRelatedCells: !this.state.showRelatedCells });
  }

  render() {
    return (<div>
      <section className="hero is-fullheight">
        <div className="container is-fluid">
          <Banner />
          <div className="container">
            <Tools
              solve={this.solve}
              isStoped={this.state.stop}
              stop={this.stop}
              newGame={this.newGame}
              deleteGame={this.deleteGame}
              getBoardCoords={this.getBoardCoords}
              goBack={this.goBack}
              showRelatedCells={this.state.showRelatedCells}
              toggleShowRelatedCells={this.toggleShowRelatedCells}
              generateNewCompleteBoard={this.generateNewCompleteBoard}
            />
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
