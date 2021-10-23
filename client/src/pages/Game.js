import { makeStyles, Button, Container } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Game = () => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      <Button variant="contained">BUZZ IN</Button>
    </Container>
  );
};

export default Game;