import {INIT_TILES} from '../actions/types';
import {put, takeLatest, call} from 'redux-saga/effects';
import * as TilesActions from '../actions/tiles';

function* initTilesSaga(action) {
  yield put(TilesActions.initSuccess(action.grid));
}

export default function* root() {
  yield [yield takeLatest(INIT_TILES.ATTEMPT, initTilesSaga)];
}
