import { CATEGORY_STORAGE, GAMEID_STORAGE, LOGIN_STORAGE, SCORE_STORAGE } from '../constants';
import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;

export const getSelectedCategories = async (gameId) => {
  try {
    const url = api_url + `game/getSelectedCategories?gameId=${gameId}`;
    const result = await axios.get(url);
    const ids = result.data.extend.categoriesIds;
    const categoryStorage = JSON.parse(localStorage.getItem(CATEGORY_STORAGE));
    console.log('here', result, categoryStorage);
    const returnResult = ids.map((id) => {
      console.log('ids', id);
      return {
        categorieid: id,
        categoryname: categoryStorage.find(({ categorieid }) => id === categorieid).categoryname,
      }
    });
    console.log('returnResult', returnResult);
    return returnResult;
  } catch (e) {
    throw Error;
  }
}

export const sendSelectedCategories = async (categoties, gameId) => {
  try {
    const url = api_url + `game/selectCategories?gameId=${gameId}`;
    const result = await axios.post(url, categoties);
    return result;
  } catch (e) {
    throw Error;
  }
}

export const getPlayer = () => {
  return {
    login: window.localStorage.getItem(LOGIN_STORAGE),
    score: window.localStorage.getItem(SCORE_STORAGE)
  };
}

export const getAllCategories = async () => {
  try {
    const url = api_url + 'category';
    const result = await axios.get(url);
    console.log('getAllCategories', result);
    localStorage.setItem(CATEGORY_STORAGE, JSON.stringify(result.data.extend.category));
    return result.data.extend.category;
  } catch (e) {
    return Error;
  }
}

export const getQuestionsByCategory = async (categoryId) => {
  const url = api_url + `questions/${categoryId}`;
  try {
    const result = await axios.get(url);
    return result.data.extend.questions;
  } catch (error) {
    return error;
  }
}

export const getAnswerByQuestion = async (questionId) => {
  const url = api_url + `selectAnswers/${questionId}`;
  try {
    const result = await axios.get(url);
    return result.data.extend.answers;
  } catch (error) {
    return error;
  }
}

export const checkAnswer = async (answerId, questionId) => {
  const url = api_url + `checkAnswer/${answerId}/${questionId}`;
  try {
    const result = await axios.get(url);
    return result.data.extend.correctness;
  } catch (error) {
    return error;
  }
}

export const gamePlay = async (login, score, gameId) => {
  const url = api_url + `game/gameplay/?gameId=${gameId}`;
  const postObject = {
    player: {login},
    scoreEarned: score,
    gameId
  }
  console.log(postObject)
  try {
    const result = await axios.post(url, postObject);
    console.log(result)

    return result.data.extend;
  } catch (error) {
    return error;
  }
}

export const gameStart = async (login) => {
  const url = api_url + `game/start/`;
  try {
    const result = await axios.post(url, { login });
    window.localStorage.setItem(LOGIN_STORAGE, login);
    return result.data.extend.game.gameId;
  } catch (error) {
    return error;
  }
}

export const gameConnect = async (login, gameId) => {
  const url = api_url + `game/connect?gameId=${gameId}`;
  
  window.localStorage.setItem(GAMEID_STORAGE, gameId);
  window.localStorage.setItem(LOGIN_STORAGE, login);
  try {
    const result = await axios.post(url, { login });
    console.log('gameStart', result);
    return result.data;
  } catch (error) {
    return error;
  }
}

export const buzzIn = async (login, gameId) => {
  const url = api_url + `game/buzz?gameId=${gameId}`;
  try {
    const result = await axios.post(url, { login });
    console.log('buzzin', result);
    if (!result.data.extend.game) {
      return { msg: result.data.msg };
    } else {
      const game = result.data.extend.game;
      const players = !!game ? [game.player1, game.player2, game.player3] : [];
      return { players };
    }
  } catch (error) {
    return error;
  }
}

export const getBuzzed = async (login, gameId) => {
  const url = api_url + `game/getBuzzed?gameId=${gameId}`;
  try {
    const result = await axios.get(url);
    console.log('getBuzzed', result);
    if (result.data.extend) {
      return { player: result.data.extend.player };
    } else {
      return { msg: result.data.msg };
    }
  } catch (error) {
    return error;
  }
}

export const buzzRelease = async (gameId) => {
  const url = api_url + `game/buzzRelease?gameId=${gameId}`;
  try {
    const result = await axios.get(url);
    return result.data.extend.game;
  } catch (error) {
    return error;
  }
}