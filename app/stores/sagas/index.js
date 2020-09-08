import {all, call} from 'redux-saga/effects';
import initTilesSaga from './initTilesSaga';
import shuffleTilesSaga from './shuffleTilesSaga';
import moveTilesSaga from './moveTilesSaga';

export default function* root() {
  yield all([call(initTilesSaga), call(shuffleTilesSaga), call(moveTilesSaga)]);
}
