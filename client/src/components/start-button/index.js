import { makeStyles, Button, Container } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  startBtn: {
    background: '#c80000',
    color: '#fff',
  },
}));


const StartButton = () => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      <Button className={styles.startBtn} variant="contained" size="large">Start Game</Button>
    </Container>
  );
};

export default StartButton;