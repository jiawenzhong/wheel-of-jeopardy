import { makeStyles, Container } from '@material-ui/core';
import  '../App.css';
import React from 'react';
import StartButton from '../components/start-button';
import logo from '../assets/loading.gif'

import { Button } from 'react-bootstrap';
import history from './../history';

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
      <Button variant="btn btn-success" onClick={() => history.push('/Game')}>Click button to view products</Button>


    </Container>
  );
}



export default Home;