import {MOVE_TILES} from '../actions/types';
import {put, select, takeLatest} from 'redux-saga/effects';
import * as TilesActions from '../actions/tiles';

export const getTiles = (state) => state.tiles;

function* moveTilesSaga(action) {
  const {row, column} = action.payload;
  let tiles = yield select(getTiles);
  let {emptyRow, emptyColumn} = tiles;
  const emptyItem = tiles.tiles.length;

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
    yield put(TilesActions.moveSuccess(tiles.tiles, emptyRow, emptyColumn));

    if (isCorrectTiles(tiles.tiles, emptyItem)) {
      yield put(TilesActions.finishTiles());
    }
  } else {
    alert('not allowed');
  }
}

export default function* root() {
  yield [yield takeLatest(MOVE_TILES.ATTEMPT, moveTilesSaga)];
}

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
