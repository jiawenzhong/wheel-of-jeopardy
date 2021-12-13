import { makeStyles,TextField, Container } from '@material-ui/core';
import { Stack } from '@mui/material';
import  '../App.css';
import React, { useState } from 'react';
import StartButton from '../components/start-button';
import logo from '../assets/loading.gif'
import { gameConnect, gameStart } from '../api/game';
import history from '../utils/History';
import { generatePath } from 'react-router';
import { GAME, GAMEID_STORAGE, ROOM_FULL_MESSAGE, SETUP } from '../constants';


const useStyles = makeStyles((theme) => ({
  root: {},
}));


document.body.style = 'background: orange;';

const Home = () => {
  const styles = useStyles();
  const [login, setLogin] = useState('');
  const [sessionId, setSessionId] = useState('');

  const handleJoinSession = async () => {
    try {
      console.log(login, sessionId);
      const connection = await gameConnect(login, sessionId);
      if (!!connection.msg && connection.msg === ROOM_FULL_MESSAGE) {
        window.alert(ROOM_FULL_MESSAGE);
      } else {
        history.push(generatePath(GAME, { sessionId: sessionId }) );
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  const handleStartGame = async () => {
    try {
      const result = await gameStart(login);
      window.localStorage.setItem(GAMEID_STORAGE, result);
      history.push(SETUP);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    
    <Container className={styles.root}>
      <h1> Welcom to Wheel of Jepordy!</h1>
      <h1> Enter your username below</h1>

      <Container className={styles.root} maxWidth="sm">
        {/* <Stack> */}
          <TextField 
            id="outlined-basic"
            label="Username" 
            variant="outlined" 
            color="primary" 
            value={login} 
            onChange={e => setLogin(e.target.value)}
          />
          <br />
          <TextField 
            id="outlined-basic"
            label="Session id"
            variant="outlined"
            color="primary"
            value={sessionId} 
            onChange={e => setSessionId(e.target.value)}
          />
          <br />
          <StartButton text={'Join'} handleSubmit={handleJoinSession} />
          <br />
          <StartButton text={'Start'} handleSubmit={handleStartGame} />
          <img src={logo} alt="loading..." width={'100%'} />
        {/* </Stack> */}
      </Container>
    </Container>

  );
}



export default Home;