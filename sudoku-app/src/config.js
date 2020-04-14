const N_ROWS = 9;
const N_COLUMNS = 9;
const AVAILABLE_VALUES = new Array(Math.max(N_ROWS, N_COLUMNS)).fill('').map((v, i) => i + 1);

export default {
  N_ROWS,
  N_COLUMNS,
  AVAILABLE_VALUES,
  DIFICULT: {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard"
  },
  CLASS_FOR_DIFICULT: {
    easy: "is-success",
    medium: "is-warning",
    hard: "is-danger"
  },
  FACE_FOR_DIFICULT: {
    easy: "🥳",
    medium: "😐",
    hard: "😨"
  }
}
