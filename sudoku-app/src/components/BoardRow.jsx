import React from 'react';
import config from '../config';

export default ({ rowNumber, handleChange, handleFocus, cellsValue, cellsBackgroundColor }) => {

  const isThirdPosition = elem => elem % 3 === 0 && elem > 1

  const trClassName = isThirdPosition(rowNumber) ? 'square-sep' : 'square';
  const rowOffset = rowNumber * config.N_ROWS

  const getValueOfCell = (cell) => cellsValue[rowOffset + cell];
  const getBgColor = (cell) => cellsBackgroundColor[rowOffset + cell] + " squareinp";

  const renderedCells = [];

  for (let cell = 0; cell < config.N_COLUMNS; cell++) {
    const cellKey = `${rowNumber + 1}${cell + 1}`;
    const value = getValueOfCell(cell);
    const cellClassName = getBgColor(cell)

    const tdClassName = isThirdPosition(cell) ? 'square-septd' : 'square';

    renderedCells.push(
      <td key={cellKey} className={tdClassName}>
        <input
          id={cellKey}
          key={cellKey}
          type="number"
          name="name"
          className={cellClassName}
          onChange={handleChange}
          onFocus={handleFocus}
          value={value}
          autoComplete='off'
        />
      </td>
    );
  }

  return (
    <tr className={trClassName}>
      {renderedCells}
    </tr>
  );

}