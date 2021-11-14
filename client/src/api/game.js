// import axios from 'axios';

export const getSelectedCategories = () => {
  // const result = axios.get('/getCategories');
  return [
    { id: 0, option: 'Animal' },
    { id: 1, option: 'Sport' },
    { id: 2, option: 'Cars' },
    { id: 3, option: 'Movies' },
    { id: 4, option: 'Literature' },
    { id: 5, option: 'Solar System' },
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