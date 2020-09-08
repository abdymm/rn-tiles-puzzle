// index.js
import {INIT_TILES, SHUFFLE_TILES, MOVE_TILES, FINISH_TILES} from './types';

export const init = (grid) => async (dispatch, getState) => {
  dispatch({type: INIT_TILES.ATTEMPT});
  dispatch(initSuccess(grid));
};
export const initSuccess = (grid) => {
  return {
    type: INIT_TILES.SUCCESS,
    grid,
  };
};

export const shuffle = () => async (dispatch, getState) => {
  dispatch({type: SHUFFLE_TILES.ATTEMPT});
  dispatch(shuffleSuccess());
};
export const shuffleSuccess = () => {
  return {
    type: SHUFFLE_TILES.SUCCESS,
  };
};

export const move = (row, column) => async (dispatch, getState) => {
  const {tiles} = getState();
  let {emptyRow, emptyColumn} = tiles;
  const emptyItem = tiles.tiles.length;

  dispatch({type: MOVE_TILES.ATTEMPT});

  //allowed condition
  if (
    (Math.abs(emptyRow - row) === 1 && emptyColumn === column) ||
    (Math.abs(emptyColumn - column) === 1 && emptyRow === row)
  ) {
    console.log(emptyRow, row);
    console.log(emptyColumn, column);
    console.log(tiles.tiles);
    tiles.tiles[emptyRow][emptyColumn] = tiles.tiles[row][column];
    tiles.tiles[row][column] = emptyItem * emptyItem;

    emptyRow = row;
    emptyColumn = column;
    dispatch(moveSuccess(tiles.tiles, emptyRow, emptyColumn));

    if (isCorrectTiles(tiles.tiles, emptyItem)) {
      dispatch(finishTiles());
    }
  } else {
    alert('not allowed');
  }
};
export const moveSuccess = (tiles, emptyRow, emptyColumn) => {
  return {
    type: MOVE_TILES.SUCCESS,
    payload: {tiles, emptyRow, emptyColumn},
  };
};

export const finishTiles = () => {
  return {
    type: FINISH_TILES.SUCCESS,
  };
};
function isCorrectTiles(tiles, emptyItem) {
  for (let i = 0; i < emptyItem; i++) {
    for (let j = 0; j < emptyItem; j++) {
      if (emptyItem * i + j + 1 !== tiles[i][j]) {
        return false;
      }
    }
  }
  return true;
}
