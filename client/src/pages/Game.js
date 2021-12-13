import { makeStyles, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BuzzButton from '../components/buzz-button';
import DecisionWheel from '../components/wheel';
import { getSelectedCategories, getPlayer, gamePlay, getAllCategories, buzzIn } from '../api/game';
import { Typography } from '@material-ui/core';
import { CATEGORY_STORAGE, GAMEID_STORAGE, GAME_FINISH_MESSAGE, LATE_MESSAGE, LOGIN_STORAGE, SCORE_STORAGE, SESSION_ID } from '../constants';

const dataOptions = [
  { style: { backgroundColor: 'green', textColor: 'white' } },
  { style: { backgroundColor: 'red', textColor: 'white' } },
  { style: { backgroundColor: 'blue', textColor: 'white' } },
  { style: { backgroundColor: 'brown', textColor: 'white' } },
  { style: { backgroundColor: 'orange', textColor: 'white' } },
  { style: { backgroundColor: 'grey', textColor: 'white' } },
]

const useStyles = makeStyles((theme) => ({
  root: {},
}));

document.body.style = 'background: orange;';

const Game = () => {
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState();
  const styles = useStyles();

  // const handleBuzzin = async () => {
  //   try {
  //     const login = window.localStorage.getItem(LOGIN_STORAGE);
  //     const score = window.localStorage.getItem(SCORE_STORAGE);
  //     const gameId = window.localStorage.getItem(GAMEID_STORAGE);
  //     const playGame = await buzzIn(login, gameId);
  //     if (playGame.msg === GAME_FINISH_MESSAGE) {
  //       window.alert(GAME_FINISH_MESSAGE)
  //     }
  //     if (playGame.msg === LATE_MESSAGE) {
  //       window.alert(LATE_MESSAGE);
  //     }
  //     console.log('playGame', playGame)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  useEffect(() => {
    // async function getAllCateories() {
    //   try {
    //     await getAllCategories();
    //   } catch (error) {
    //     throw Error;
    //   }
    // }

    async function getCategories () {
      try {
        const categoryStorage = JSON.parse(localStorage.getItem(CATEGORY_STORAGE));
        console.log('join session', categoryStorage);
        if (categoryStorage === null) {
          await getAllCategories();
        }
        const categories = await getSelectedCategories(SESSION_ID);
        const combineData = categories.map(({ categorieid, categoryname }) => {
          return { option: categoryname, ...dataOptions[categorieid - 1] };
        });
        setData(combineData);
      } catch (e) {
        console.log(e)
        throw Error;
      }
    }
    // getAllCateories();
    getCategories();

  }, []);

  useEffect(() => {
    // TODO: save session ID when user login, then use session ID to get player
    const result = getPlayer();
    setPlayer(result);
  }, []);
  return (
    
    <Container className={styles.root}>
      {player && (
        <div>
          <Typography variant="h3">Player: {player.login}</Typography>
          <Typography variant="h3">Score: {player.score}</Typography>
          <Typography variant="subtitle1">Session ID: {window.localStorage.getItem(GAMEID_STORAGE)}</Typography>
        </div>
      )}
      <br />
      <DecisionWheel data={data}/>
      {/* <BuzzButton handleBuzzin={handleBuzzin} /> */}
    </Container>
  );
};

export default Game;