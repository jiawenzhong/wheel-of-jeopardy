import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import history from '../../utils/History';
import * as ROUTES from '../../constants';
import { generatePath } from 'react-router';

const useStyles = makeStyles((theme) => ({
  wheel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinBtn: {
    margin: 50,
  },
}));

const DecisionWheel = ({ data }) => {
  const styles = useStyles();
  const [mustSpin, setMustSpin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleSpinClick = () => {
    const randomCategory = Math.floor(Math.random() * data.length);
    setSelectedCategory(randomCategory);
    setMustSpin(true);
    console.log(randomCategory, data[randomCategory].option);
  }

  const handleRedirect = () => {
    history.push(generatePath(ROUTES.SELECT_QUESTION, { categoryId: selectedCategory }))
  }
  return (
    <>
      <div className={styles.wheel}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={selectedCategory}
          data={data}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
          onStopSpinning={() => {
            setMustSpin(false);
            handleRedirect();
          }}
        />
      </div>
      <Button className={styles.spinBtn} variant="contained" color="primary" onClick={handleSpinClick}>SPIN</Button>
    </>
  );
};

export default DecisionWheel;