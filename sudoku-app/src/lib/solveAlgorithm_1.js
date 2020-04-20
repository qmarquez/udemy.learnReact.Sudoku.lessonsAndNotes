import cellInfo from "./cellInfo"
import getRelatedCells from "./getRelatedCells";

/**
 * Returns the cells wich have only one value available to put.
 */
export default (board) => {
  return board
    .map(
      (value, index) => {
        if (!value) {
          const { row, column, cubeIndex, cellIndex } = cellInfo(index, value);
          const { availableValues } = getRelatedCells({ row, column, cubeIndex }, board);
          return { cellIndex, availableValues };
        }
        return undefined;
      }
    )
    .filter(
      cell => cell ? cell.availableValues.length === 1 : false
    )
    .map(
      ({ cellIndex, availableValues }) => ({ cellIndex, value: availableValues[0] })
    );
}