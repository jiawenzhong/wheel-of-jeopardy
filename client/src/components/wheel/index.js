import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: 'Animal', style: { backgroundColor: 'green', textColor: 'white' } },
  { option: 'Sport', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: 'Cars', style: { backgroundColor: 'blue', textColor: 'white' } },
  { option: '3', style: { backgroundColor: 'brown', textColor: 'white' } },
  { option: '4', style: { backgroundColor: 'orange', textColor: 'white' } },
  { option: '5', style: { backgroundColor: 'grey', textColor: 'white' } },
]

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

const DecisionWheel = () => {
  const styles = useStyles();
  const [mustSpin, setMustSpin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setSelectedCategory(newPrizeNumber);
    setMustSpin(true);
    console.log(newPrizeNumber, data[newPrizeNumber].option);
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
            setMustSpin(false)
          }}
        />
      </div>
      <Button className={styles.spinBtn} variant="contained" color="primary" onClick={handleSpinClick}>SPIN</Button>
    </>
  );
};

export default DecisionWheel;