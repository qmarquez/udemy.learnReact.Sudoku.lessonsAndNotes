import getRelatedCells from "./getRelatedCells"
import cellInfo from "./cellInfo"

/**
 * Returns the cells wich have only one value available to put by division (cube, row or column).
 */
export default (board) => {
  return board
    .map(
      (value, index) => {
        const currentCell = cellInfo(index, value);

        if (currentCell.iValue) { return undefined; }

        const { relatedCellsBy, availableValues } = getRelatedCells(currentCell, board);
        const valuesBy = {
          cube: new Set(availableValues),
          row: new Set(availableValues),
          column: new Set(availableValues)
        }

        for (const division in relatedCellsBy) {
          for (const cell of relatedCellsBy[division]) {
            if (cell.cellIndex !== index && !cell.iValue) {
              getRelatedCells(cell, board)
                .availableValues
                .forEach(elem => valuesBy[division].delete(elem));
            }
            if (!valuesBy[division].size) {
              break;
            }
          }
        }

        for (const division in valuesBy) {
          if (valuesBy[division].size === 1) {
            return {
              cellIndex: currentCell.cellIndex,
              value: valuesBy[division].values().next().value,
              extraDetails: { using: division }
            };
          }
        }

        return undefined;
      }
    )
    .filter(cell => cell);
}