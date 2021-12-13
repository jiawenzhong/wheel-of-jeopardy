import { makeStyles, FormGroup, FormControlLabel, Checkbox, Typography, Button, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { generatePath } from 'react-router';
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
    async function getCateories() {
      try {
        const result = await getAllCategories();
        console.log('front', result);
        setAllCategories(result);
      } catch (error) {
        throw Error;
      }
    }
    getCateories();
    const playerResult =  getPlayer();
    setPlayer(playerResult);
  }, []);

  const handleChange = async (option, isChecked) => {
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

  const handleSubmit = async () => {
    console.log(selectCategory)
    if (selectCategory.length === 6) {
      try {
        const sendResult = await sendSelectedCategories(selectCategory, ROUTES.SESSION_ID);
        console.log('sendResult', sendResult);
        // sendSelectedCategories(selectCategory, player);
        history.push(generatePath(ROUTES.GAME, { sessionId: ROUTES.SESSION_ID }) );
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
            {allCategories.map(({ categorieid, categoryname }) => {
              return (
                <FormControlLabel key={categorieid} className={styles.formControl} control={<Checkbox />} label={categoryname} onChange={(event) => handleChange(categorieid, event.target.checked)}/>
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