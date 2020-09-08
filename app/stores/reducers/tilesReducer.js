import {
  INIT_TILES,
  SHUFFLE_TILES,
  MOVE_TILES,
  FINISH_TILES,
} from '../actions/types';

const defaultState = {
  start: false,
  error: '',
  tiles: [],
  emptyRow: 0,
  emptyColumn: 0,
  finish: false,
};

function shuffleMultiArray(multArr) {
  for (let i = 0; i < multArr.length; i++) {
    for (let j = 0; j < multArr[i].length; j++) {
      let i1 = Math.floor(Math.random() * multArr.length);
      let j1 = Math.floor(Math.random() * multArr.length);

      let temp = multArr[i][j];
      multArr[i][j] = multArr[i1][j1];

      multArr[i1][j1] = temp;
    }
  }
  return multArr;
}

function getEmptyRowColumn(multArr, emptyRowColumnValue) {
  let row = 0;
  let column = 0;
  for (let i = 0; i < multArr.length; i++) {
    for (let j = 0; j < multArr.length; j++) {
      if (multArr[i][j] === emptyRowColumnValue) {
        row = i;
        column = j;
      }
    }
  }
  return {row, column};
}

export default function tilesReducer(state = defaultState, action) {
  switch (action.type) {
    case INIT_TILES.ATTEMP:
      return {
        ...state,
        error: '',
        finish: false,
      };
    case INIT_TILES.SUCCESS:
      const {grid} = action;
      let tiles = [];
      for (let i = 0; i < grid; i++) {
        tiles[i] = [];
        for (let j = 0; j < grid; j++) {
          tiles[i][j] = grid * i + j + 1;
        }
      }
      return {
        ...state,
        tiles,
        finish: false,
        start: false,
      };

    case SHUFFLE_TILES.ATTEMP:
      return {
        ...state,
        start: true,
        error: '',
        finish: false,
      };
    case SHUFFLE_TILES.SUCCESS:
      const emptyRowColumnValue = state.tiles.length * state.tiles.length;
      let shuffledTiles = shuffleMultiArray(state.tiles);
      let {row, column} = getEmptyRowColumn(shuffledTiles, emptyRowColumnValue);

      return {
        ...state,
        start: true,
        tiles: shuffledTiles,
        emptyRow: row,
        emptyColumn: column,
      };

    case MOVE_TILES.ATTEMP:
      return {
        ...state,
        error: '',
      };
    case MOVE_TILES.SUCCESS:
      let {emptyRow, emptyColumn} = action.payload;
      console.log('dataaction', action.payload);
      return {
        ...state,
        tiles: action.payload.tiles,
        emptyRow,
        emptyColumn,
      };
    case FINISH_TILES.SUCCESS:
      return {
        ...state,
        error: '',
        start: false,
        finish: true,
      };

    default:
      return state;
  }
}
