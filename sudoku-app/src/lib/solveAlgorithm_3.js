import getRelatedCells from "./getRelatedCells"
import cellInfo from "./cellInfo"
import config from "../config";
import _ from 'lodash';
import solveAlgorithm_1 from "./solveAlgorithm_1";
import solveAlgorithm_2 from "./solveAlgorithm_2";
import solveAlgorithm_3 from "./solveAlgorithm_3";
import gameInfo from "./gameInfo";

/**
 * Returns the cells wich have only two value available to put.
 */
export default (board, useSafeQuantity = true) => {
  const candidates = board
    .map(
      (value, index) => {
        const currentCell = cellInfo(index, value);

        if (currentCell.iValue) { return undefined; }

        const { availableValues } = getRelatedCells(currentCell, board);

        if (availableValues.length) {
          return { index, values: availableValues }
        } else return undefined;
      }
    )
    .filter(cell => cell && useSafeQuantity ? cell.values.length === 2 : true);

  if (!candidates.length) { return []; }

  let goodCandidate;
  let maxIteration = config.MAX_ITERATION;
  while (maxIteration > 0) {
    const candidateToTry = _.sample(candidates);
    goodCandidate = tryCandidate(candidateToTry, board);

    if (goodCandidate) { break; }

    goodCandidate = [];
    maxIteration--;
  }

  return goodCandidate;
}


function tryCandidate({ index, values }, board) {

  let auxValues;
  const valueToTry = _.sample(values);

  if (!valueToTry) {
    return false;
  }

  board[index] = valueToTry;
  do {
    const isValidBoard = board
      .map((value, i) => !value && getRelatedCells(i, board).availableValues)
      .filter(availableValues => availableValues)
      .reduce((acc, availableValues) => acc && availableValues.length > 0, true);

    if (!isValidBoard) { return false }

    auxValues = solveAlgorithm_1(board);
    auxValues.forEach(({ cellIndex, value }) => board[cellIndex] = value);
    if (auxValues.length) { continue; }

    auxValues = solveAlgorithm_2(board);
    auxValues.forEach(({ cellIndex, value }) => board[cellIndex] = value);
    if (auxValues.length) { continue; }

    auxValues = solveAlgorithm_3(board);
    auxValues.forEach(({ cellIndex, value }) => board[cellIndex] = value);
    if (auxValues.length) { continue; }

  } while (auxValues.length);
  const { countEmptyCells } = gameInfo(board);

  if (countEmptyCells === 0) {
    return [{ cellIndex: index, value: valueToTry }];
  } else {
    return false;
  }

}