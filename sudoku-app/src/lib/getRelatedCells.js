import cellInfo from "./cellInfo";
import config from "../config";
import _ from 'lodash';

export default ({ row, column, cubeIndex }, board) => {
  const relatedCells = [];
  const availableValues = [];
  const relatedCellsBy = {
    cube: [],
    row: [],
    column: []
  };

  board.forEach(
    (value, index) => {
      const cell = cellInfo(index, value);
      if (row === cell.row || column === cell.column || cubeIndex === cell.cubeIndex) {
        relatedCells.push(cell);
      }

      if (cubeIndex === cell.cubeIndex) { relatedCellsBy.cube.push(cell); }

      if (column === cell.column) { relatedCellsBy.column.push(cell) }

      if (row === cell.row) { relatedCellsBy.row.push(cell); }
    }
  );

  availableValues.push(..._.difference(config.AVAILABLE_VALUES, relatedCells.map(({ iValue }) => iValue)));

  return { relatedCells, availableValues, relatedCellsBy };
}