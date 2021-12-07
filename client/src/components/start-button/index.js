import { makeStyles, Button, Container } from '@material-ui/core';
import React from 'react';
import * as ROUTES from '../../constants';
import history from '../../utils/History';


const useStyles = makeStyles((theme) => ({
  startBtn: {
    background: '#c80000',
    color: '#fff',
  },
}));

const handleSubmit = () => {
  try {
    history.push(ROUTES.SETUP);
  } catch (error) {
    throw Error;
}
}

const StartButton = () => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      <Button className={styles.startBtn} variant="contained" size="large" onClick={handleSubmit}>Start Game</Button>
    </Container>
  );
};

export default StartButton;