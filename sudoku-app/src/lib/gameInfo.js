import getRelatedCells from "./getRelatedCells";
import cellInfo from "./cellInfo";

export default (board) => {
  let countEmptyCells = 0;
  let complexityLevel = 1;
  board.forEach(
    (value, index) => {
      if (!value) {
        const { availableValues } = getRelatedCells(cellInfo(index, value), board);
        complexityLevel *= availableValues.length;
        countEmptyCells++;
      }
    }
  );
  const complexityLog = Math.log(complexityLevel) / Math.log(10);
  return { countEmptyCells, complexityLevel, complexityLog };
}