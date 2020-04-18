import cellInfo from "./cellInfo"
import getRelatedCells from "./getRelatedCells";

export default (board) => {
  return board
    .map(
      (value, index) => {
        if (!value) {
          const { row, column, cubeIndex, cellIndex } = cellInfo(index, value);
          const { relatedCells, availableValues: availableValue } = getRelatedCells({ row, column, cubeIndex }, board);
          return { cellIndex, relatedCells, availableValue, row, column};
        }
        return undefined;
      }
    )
    .filter(
      cell => {
        if (cell) {
          const { availableValue } = cell;
          return availableValue.length === 1;
        }
        return false;
      }
    );
}