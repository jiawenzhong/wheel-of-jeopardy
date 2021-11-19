import { makeStyles,TextField, Container,Fab,EditIcon} from '@material-ui/core';
import  '../App.css';
import React from 'react';
import StartButton from '../components/start-button';
import logo from '../assets/loading.gif'
import SoundPlayer from '../components/soundplayer';



const useStyles = makeStyles((theme) => ({
  root: {},
}));

document.body.style = 'background: orange;';

const Home = () => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>

      <h1> Please wait for players to join...</h1>

      <Container className={styles.root}>

      <TextField id="outlined-basic" label="Username" variant="outlined" color="black" />
      <Fab color="secondary" aria-label="edit">
  <EditIcon />
</Fab>
      </Container>

      <img src={logo} alt="loading..." />
      <StartButton />
      <SoundPlayer/>
    </Container>
  );
}


export default Home;