import { makeStyles, Container } from '@material-ui/core';
import React from 'react';
import BuzzButton from '../components/buzz-button';
import DecisionWheel from '../components/wheel';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

document.body.style = 'background: orange;';

const Game = () => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      <DecisionWheel />
      <BuzzButton />
    </Container>
  );
};

export default Game;