import React from 'react';
import Banner from './components/Banner';
import Tools from './components/Tools';
import 'bulma/css/bulma.css';
import Board from './components/Board';
import config from './config';
import NewGame from './Controls/NewGame';

class App extends React.Component {

  state = {
    cellsValue: new Array(config.N_ROWS * config.N_COLUMNS).fill(""),
    cellsBackgroundColor: new Array(config.N_ROWS * config.N_COLUMNS).fill(".bg-white"),
  };

  solve = () => {

  }
  stop = () => {

  }
  newGame = () => {
    const newGame = NewGame.getRandomLevel();
    this.setState({ cellsValue: [...newGame.board] });
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

  render() {
    return (<div>
      <Banner />
      <Tools
        solve={this.solve}
        stop={this.stop}
        newGame={this.newGame}
        deleteGame={this.deleteGame}
        getThisAsStr={this.getThisAsStr}
        goBack={this.goBack} />
      <Board
        handleChange={this.handleChange}
        handleFocus={this.handleFocus}
        cellsValue={this.state.cellsValue}
        cellsBackgroundColor={this.state.cellsBackgroundColor} />
    </div >
    );
  }
}

export default App;
