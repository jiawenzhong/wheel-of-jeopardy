export const HOME = '/';
export const GAME = '/in-game/:sessionId';
export const SETUP = '/setup';
export const SELECT_QUESTION = '/select-question/:categoryId';
export const CATEGORY_STORAGE = 'CATEGORY_STORAGE';
export const SCORE_STORAGE = 'SCORE_STORAGE';
export const GAMEID_STORAGE = 'GAMEID_STORAGE';
export const LOGIN_STORAGE = 'LOGIN_STORAGE';
export const LATE_MESSAGE = 'Someone else buzzed before you, you are late!';
export const GAME_FINISH_MESSAGE = 'The Game correspond to the gameId is Finished';
export const ROOM_FULL_MESSAGE = 'The room correspond to the gameId is full';
export const NOT_ENOUGH_PLAYER_MESSAGE = 'The room is not full yet, Wait for everyone to join';
export const SESSION_ID = window.localStorage.getItem(GAMEID_STORAGE);
export const GAME_STATUS = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED'
}