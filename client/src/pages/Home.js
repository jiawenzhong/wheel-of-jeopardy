import { makeStyles,TextField, Container,Button} from '@material-ui/core';
import { Stack } from '@mui/material';
import  '../App.css';
import React from 'react';
import StartButton from '../components/start-button';
import logo from '../assets/loading.gif'
import Menu from '../components/menudial';


const useStyles = makeStyles((theme) => ({
  root: {},
}));


document.body.style = 'background: orange;';

const Home = () => {
  const styles = useStyles();
  return (
    
    <Container className={styles.root}>
      <h1> Wheel of Jepordy!</h1>
      <h1> Enter your username below</h1>

      <Container className={styles.root} maxWidth="sm">
      
      <Stack spacing={2}>
      <TextField id="outlined-basic" label="Username" variant="outlined" color="primary" />
      <Button   variant="contained" size="small" color="Secondary" >Submit</Button>
      <img src={logo} alt="loading..."/>
      <StartButton/>
      </Stack>
      </Container>
      <Menu/>
      </Container>

  );
}



export default Home;