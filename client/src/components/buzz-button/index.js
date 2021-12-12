import { makeStyles, Button, Container } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  buzzBtn: {
    background: '#c80000',
    color: '#fff',
  },
}));

const BuzzButton = ({ handleBuzzin }) => {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <Button 
        className={styles.buzzBtn} 
        variant="contained" 
        size="large"
        onClick={handleBuzzin}
      >BUZZ IN</Button>
    </Container>
  );
};

export default BuzzButton;