import { makeStyles, Container, FormGroup, FormControlLabel, Checkbox, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { checkAnswer, getAnswerByQuestion, getQuestionsByCategory } from '../api/game';
import * as ROUTES from '../constants';
import History from '../utils/History';
import { generatePath } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {},
  centerList: {
    display: 'inline-block'
  }
}));

const SelectQuestion = (props) => {
  const styles = useStyles();
  // const { categoryId } = useParams();
  const categoryId = props.match.params.categoryId;
  const [questions, setQuestions] = useState([]);
  const [canContinue, setContinue] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [answerOptions, setAnswerOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const handleChange = (question) => {
    setSelectedQuestion(question);
    console.log(question);
  }

  const handleContinue = async () => {
    try {
      const result = await getAnswerByQuestion(selectedQuestion.questionid);
      setAnswerOptions(result);
      console.log('answers', result);
      setContinue(true);
    } catch (error) {
      throw Error;
    }
  }

  const handleAnswerSelected = async (answer) => {
    setSelectedAnswer(answer);
  }

  const handleAnswerSubmit = async () => {
    try {
      const isCorrect = await checkAnswer(selectedAnswer.answerid, selectedQuestion.questionid);
      console.log(selectedAnswer.answerid, selectedQuestion.questionid);
      let currentScore = parseInt(window.localStorage.getItem('score'));
      if (isCorrect) {
        currentScore = currentScore + selectedQuestion.pointvalue;
        window.localStorage.setItem('score', currentScore);
      }
      History.push(generatePath(ROUTES.GAME, { sessionId: ROUTES.TEMP_ID }));
    } catch (error) {
      throw Error;
    }
  }

  useEffect(() => {
    async function getQuestions() {
      try {
        const results = await getQuestionsByCategory(categoryId);
        console.log('front', results);
        setQuestions(results);
      } catch (error) {
        throw Error;
      }
    }
    getQuestions();
  }, [categoryId]);

  return (
    <Container className={styles.root}>
      <Typography variant="h5">Please select 1 from below:</Typography>
      {questions.length > 0 && !canContinue ? (
        <div className={styles.centerList}>
          <FormGroup>
            {questions.map((q) => {
              return (
                <FormControlLabel key={q.questionid} className={styles.formControl} control={<Checkbox />} label={`${q.question} ${q.pointvalue}`} onChange={() => handleChange(q)}/>
              )
            })}
          </FormGroup>
          <br />
          <Button variant="contained" onClick={handleContinue}>Continue</Button>
        </div>
      ) : (
        <div>
          <br />
          {selectedQuestion && (
            <>
              <Typography variant="h5">{selectedQuestion.question}</Typography>
              <br />
              <div  className={styles.centerList}>
                <FormGroup>
                  {answerOptions && answerOptions.map((a) => {
                    return (
                      <FormControlLabel key={a.answerid} className={styles.formControl} control={<Checkbox />} label={`${a.answerchoices}`} onChange={() => handleAnswerSelected(a)}/>
                    )
                  })}
                </FormGroup>
              </div>
              <br />
              <Button variant="contained" onClick={() => handleAnswerSubmit()}>Answer</Button>
            </>
          )}
        </div>
      )}
    </Container>
  );
}



export default withRouter(SelectQuestion);