import _ from 'lodash';
import config from '../config';
import levels from '../levels';

export default () => {
  const parsedLevels = [...levels].map(
    ({ board, ...props }) => {
      const newBoard = new Array(config.N_COLUMNS * config.N_ROWS).fill("");

      board.forEach(([value, row, column]) => newBoard[row * config.N_COLUMNS + column] = value);
      // i = row * 9 + column => column = i - row * 9
      return { ...props, board: newBoard };
    }
  );

  return _.sample(parsedLevels);
};