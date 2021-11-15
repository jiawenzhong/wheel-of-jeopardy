import { makeStyles, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BuzzButton from '../components/buzz-button';
import DecisionWheel from '../components/wheel';
import { getSelectedCategories, getPlayer } from '../api/game';
import { Typography } from '@material-ui/core';

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

const Game = () => {
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState();
  const styles = useStyles();

  useEffect(() => {
    const categories = getSelectedCategories();
    const combineData = categories.map(({ id, option }) => {
      return { option, ...dataOptions[id] };
    });
    setData(combineData);
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