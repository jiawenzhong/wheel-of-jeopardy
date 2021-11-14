import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette'
import { getSelectedCategories, getPlayer } from '../../api/game';

const dataOptions = [
  { style: { backgroundColor: 'green', textColor: 'white' } },
  { style: { backgroundColor: 'red', textColor: 'white' } },
  { style: { backgroundColor: 'blue', textColor: 'white' } },
  { style: { backgroundColor: 'brown', textColor: 'white' } },
  { style: { backgroundColor: 'orange', textColor: 'white' } },
  { style: { backgroundColor: 'grey', textColor: 'white' } },
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
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState();

  useEffect(() => {
    const categories = getSelectedCategories();
    const combineData = categories.map(({ id, option }) => {
      return { option, ...dataOptions[id] };
    });
    setData(combineData);
  }, []);

  useEffect(() => {
    // TODO: save session ID when user login, then use session ID to get player
    const result = getPlayer('112');
    setPlayer(result);
  }, []);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setSelectedCategory(newPrizeNumber);
    setMustSpin(true);
    console.log(newPrizeNumber, data[newPrizeNumber].option);
  }
  return (
    <>
      <div>
        <Typography variant="h3">Player: {player.name}</Typography>
        <Typography variant="h3">Score: {player.score}</Typography>
      </div>
      <br />
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