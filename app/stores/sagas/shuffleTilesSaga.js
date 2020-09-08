import {SHUFFLE_TILES} from '../actions/types';
import {put, takeLatest} from 'redux-saga/effects';
import * as TilesActions from '../actions/tiles';

function* shuffleTilesSaga() {
  yield put(TilesActions.shuffleSuccess());
}

export default function* root() {
  yield [yield takeLatest(SHUFFLE_TILES.ATTEMPT, shuffleTilesSaga)];
}
