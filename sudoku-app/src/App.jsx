import React from 'react';
import Banner from './components/Banner';
import Tools from './components/Tools';
import 'bulma/css/bulma.css';

class App extends React.Component {

  solve = () => {

  }
  stop = () => {

  }
  newGame = () => {

  }
  deleteGame = () => {

  }
  getThisAsStr = () => {

  }
  goBack = () => {

  }

function App() {
  return (
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
    );
  }
}

export default App;
