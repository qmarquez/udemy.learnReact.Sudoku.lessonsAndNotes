export interface CellInfo {
  row: number,
  column: number,
  cellIndex: number,
  cellId: string,
  cubeIndex: number,
  iValue: number
};

export default function (cell_IdOrIndex: string | number, value: string | number): CellInfo;