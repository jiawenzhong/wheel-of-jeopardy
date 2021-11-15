import { makeStyles, Container } from '@material-ui/core';
import  '../App.css';
import React from 'react';
import StartButton from '../components/start-button';
import logo from '../assets/loading.gif'

const useStyles = makeStyles((theme) => ({
  root: {},
}));

document.body.style = 'background: orange;';

const Home = () => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      <h1> Please wait for players to join...</h1>
      <img src={logo} alt="loading..." />
      <StartButton />
    </Container>
  );
}



export default Home;