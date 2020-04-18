import config from "../config";

export default (cell_IdOrIndex, value) => {
  const [row, column] = typeof cell_IdOrIndex === 'string' ?
    [
      parseInt(cell_IdOrIndex[0]) - 1,
      parseInt(cell_IdOrIndex[1]) - 1
    ] : [
      Math.floor(cell_IdOrIndex / config.N_ROWS),
      Math.floor(cell_IdOrIndex % config.N_COLUMNS)
    ];

  const cellId = typeof cell_IdOrIndex === 'string' ? cell_IdOrIndex : `${row + 1}${column + 1}`

  const cellIndex = typeof cell_IdOrIndex === 'number' ? cell_IdOrIndex : row * 9 + column - 1;

  const cubeRow = Math.floor((row) / 3);
  const cubeColumn = Math.floor((column) / 3)
  const cubeIndex = cubeRow * 3 + cubeColumn;

  return { row, column, cellIndex, cellId, cubeIndex, iValue: parseInt(value || 0, 10) };
}