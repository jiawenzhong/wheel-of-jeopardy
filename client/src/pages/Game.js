import { makeStyles, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BuzzButton from '../components/buzz-button';
import DecisionWheel from '../components/wheel';
import { getSelectedCategories, getPlayer } from '../api/game';
import { Typography } from '@material-ui/core';
import { TEMP_ID } from '../constants';

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

  useEffect(() => {
    async function getCategories () {
      try {
        const categories = await getSelectedCategories(TEMP_ID);
        const combineData = categories.map(({ categorieid, categoryname }) => {
          return { option: categoryname, ...dataOptions[categorieid - 1] };
        });
        setData(combineData);
      } catch (e) {
        console.log(e)
        throw Error;
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    // TODO: save session ID when user login, then use session ID to get player
    const result = getPlayer('112');
    setPlayer(result);
  }, []);
  return (
    
    <Container className={styles.root}>
      {player && (
        <div>
          <Typography variant="h3">Player: {player.name}</Typography>
          <Typography variant="h3">Score: {window.localStorage.getItem('score')}</Typography>
        </div>
      )}
      <br />
      <DecisionWheel data={data}/>
      <BuzzButton />
    </Container>
  );
};

export default Game;