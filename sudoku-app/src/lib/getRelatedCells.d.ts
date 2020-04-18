import { CellInfo } from "./cellInfo";

export default function (cellInfo: CellInfo, board: (string | number)[]): {
  relatedCells: CellInfo[],
  availableValues: number[]
};