import { CellInfo } from "./cellInfo";

export default function (board: Array<string | number>): Array<{
  cellIndex: number,
  relatedCells: CellInfo[],
  availableValue: [number]
}>;