// index.js
import {INIT_TILES, SHUFFLE_TILES, MOVE_TILES, FINISH_TILES} from './types';

export const initAttemp = (grid) => {
  return {
    type: INIT_TILES.ATTEMPT,
    grid,
  };
};

export const initSuccess = (grid) => {
  return {
    type: INIT_TILES.SUCCESS,
    grid,
  };
};

export const shuffleAttemp = () => {
  return {
    type: SHUFFLE_TILES.ATTEMPT,
  };
};

export const shuffleSuccess = () => {
  return {
    type: SHUFFLE_TILES.SUCCESS,
  };
};

export const moveAttemp = (row, column) => {
  return {
    type: MOVE_TILES.ATTEMPT,
    payload: {row, column},
  };
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