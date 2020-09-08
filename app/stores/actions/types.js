const generateType = (type) => ({
  ATTEMPT: `${type}_ATTEMPT`,
  SUCCESS: `${type}_SUCCESS`,
  FAILED: `${type}_FAILED`,
});

export const INIT_TILES = generateType(`INIT_TILES`);
export const SHUFFLE_TILES = generateType(`SHUFFLE_TILES`);
export const MOVE_TILES = generateType(`MOVE_TILES`);
export const FINISH_TILES = generateType(`FINISH_TILES`);
