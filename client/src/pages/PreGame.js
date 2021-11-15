import { makeStyles, FormGroup, FormControlLabel, Checkbox, Typography, Button, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getAllCategories, sendSelectedCategories, getPlayer } from '../api/game';
import * as ROUTES from '../constants';
import history from '../utils/History';

const useStyles = makeStyles((theme) => ({
  formGroup: {
    display: 'block',
  },
  formControl: {
    margin: '0 auto',
  },
}));

const PreGame = () => {
  const styles = useStyles();
  const [allCategories, setAllCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [player, setPlayer] = useState();

  useEffect(() => {
    const result = getAllCategories();
    setAllCategories(result);
    const playerResult =  getPlayer('112');
    setPlayer(playerResult);
  }, []);

  const handleChange = (option, isChecked) => {
    const categoryArray = selectCategory;
    if (isChecked && !categoryArray.includes(option)) {
      categoryArray.push(option);
    }
    if (!isChecked && categoryArray.includes(option)) {
      const index = categoryArray.indexOf(option);
      if (index > -1) {
        categoryArray.splice(index, 1);
      }
    }
    setSelectCategory(categoryArray);
    console.log(option, categoryArray);
  };

  const handleSubmit = () => {
    console.log(selectCategory)
    if (selectCategory.length === 6) {
      try {
        sendSelectedCategories(selectCategory, player);
        history.push(ROUTES.GAME);
      } catch (error) {
        throw Error;
      }
    }
  }

  return (
    <Container className={styles.formGroup}>
      {allCategories.length > 0 && (
        <>
          <Typography variant='h4'>Please choose 6 from the following categories below:</Typography>
          <br/>
          <FormGroup>
            {allCategories.map(({ id, option }) => {
              return (
                <FormControlLabel key={id} className={styles.formControl} control={<Checkbox />} label={option} onChange={(event) => handleChange(id, event.target.checked)}/>
              )
            })}
          </FormGroup>
        </>
      )}
      <br />
      <Button variant="contained" onClick={handleSubmit}>Continue</Button>
    </Container>
  );
};

export default PreGame;