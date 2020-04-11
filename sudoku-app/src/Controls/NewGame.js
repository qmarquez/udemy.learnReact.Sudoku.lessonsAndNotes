import _ from 'lodash';
import config from '../config';
import levels from '../levels';

export default class NewGame {

  static getRandomLevel() {
    levels.map(
      level => {        
        const newBoard = new Array(config.N_COLUMNS * config.N_ROWS).fill("");

        level.board.forEach(([value, row, column]) => newBoard[row * 9 + column] = value);
        level.board = newBoard;

        return level;
      }
    );

    return _.sample(levels);
  }
}