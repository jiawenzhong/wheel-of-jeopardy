import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;

export const getSelectedCategories = async (categoryId) => {
  // try {
  //   const url = api_url + `category/${categoryId}`;
  //   const result = await axios.get(url);
  //   return result.data.extend.category;
  // } catch (e) {
  //   return Error;
  // }

  return [
    { categorieid: 1, categoryname: 'Animal' },
    { categorieid: 2, categoryname: 'Sport' },
    { categorieid: 3, categoryname: 'Cars' },
    { categorieid: 4, categoryname: 'History' },
    { categorieid: 5, categoryname: 'Movies' },
    { categorieid: 6, categoryname: 'Literature' },
  ]
}

export const sendSelectedCategories = async (categoties) => {
  try {
    const url = api_url + 'category';
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