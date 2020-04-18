import cellInfo from "./cellInfo";
import config from "../config";
import _ from 'lodash';

export default ({ row, column, cubeIndex }, board) => {
  const relatedCells = [];
  const availableValues = [];

  board.forEach(
    (value, index) => {
      const cell = cellInfo(index, value);
      if (row === cell.row || column === cell.column || cubeIndex === cell.cubeIndex) {
        relatedCells.push(cell);
      }
    }
  );
  
  availableValues.push(..._.difference(config.AVAILABLE_VALUES, relatedCells.map(({ iValue }) => iValue)));

  return { relatedCells, availableValues };
}