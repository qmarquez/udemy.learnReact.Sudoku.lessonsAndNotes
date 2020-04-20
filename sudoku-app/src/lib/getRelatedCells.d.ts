import { CellInfo } from "./cellInfo";
import { Board } from "./Board";

export default function (cellInfo: CellInfo, board: Board): {
  relatedCells: CellInfo[],
  availableValues: number[],
  relatedCellsBy: {
    cube: CellInfo[],
    row: CellInfo[],
    column: CellInfo[],
  },
};