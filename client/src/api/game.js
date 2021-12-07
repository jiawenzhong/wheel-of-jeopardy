import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;

export const getSelectedCategories = () => {
  // const result = axios.get('/getCategories');
  return [
    { id: 1, option: 'Animal' },
    { id: 2, option: 'Sport' },
    { id: 3, option: 'Cars' },
    { id: 4, option: 'History' },
    { id: 5, option: 'Movies' },
    { id: 6, option: 'Literature' },
  ]
}

export const getPlayer = (sessionId) => {
  return {
    id: 1,
    sessionId: '112',
    name: 'Player 1',
    score: 0,
  };
} 

export const getAllCategories = () => {
  return [
    { id: 1, option: 'Animal' },
    { id: 2, option: 'Sport' },
    { id: 3, option: 'Cars' },
    { id: 4, option: 'History' },
    { id: 5, option: 'Movies' },
    { id: 6, option: 'Literature' },
    { id: 7, option: 'Solar System' },
    { id: 8, option: 'Music' },
  ];
}

export const sendSelectedCategories = (selectedOptions, player) => {
  console.log(selectedOptions, player);
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