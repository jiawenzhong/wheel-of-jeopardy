import { CATEGORY_STORAGE } from '../constants';
import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;

export const getSelectedCategories = async (gameId) => {
  try {
    const url = api_url + `game/getSelectedCategories?gameId=${gameId}`;
    const result = await axios.get(url);
    const ids = result.data.extend.categoriesIds;
    const categoryStorage = JSON.parse(localStorage.getItem(CATEGORY_STORAGE));
    console.log('here', categoryStorage);
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

export const getPlayer = (sessionId) => {
  return {
    id: 1,
    sessionId: '112',
    name: 'Player 1',
    score: 0,
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