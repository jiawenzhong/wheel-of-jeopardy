import { makeStyles, Container, FormGroup, FormControlLabel, Checkbox, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { buzzIn, buzzRelease, checkAnswer, gamePlay, getAnswerByQuestion, getBuzzed, getPlayer, getQuestionsByCategory } from '../api/game';
import * as ROUTES from '../constants';
import History from '../utils/History';
import { generatePath } from 'react-router';
import BuzzButton from '../components/buzz-button';

const useStyles = makeStyles((theme) => ({
  root: {},
  centerList: {
    display: 'inline-block'
  }
}));

const SelectQuestion = (props) => {
  const styles = useStyles();
  const [canAnswer, setCanAnswer] = useState(false);
  // const { categoryId } = useParams();
  const categoryId = props.match.params.categoryId;
  const [questions, setQuestions] = useState([]);
  const [canContinue, setContinue] = useState(false);
  const [canRelease, setCanRelease] = useState(false);
  const [canBuzzIn, setCanBuzzIn] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [answerOptions, setAnswerOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const login = getPlayer().login;
  const gameId = window.localStorage.getItem(ROUTES.GAMEID_STORAGE);

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

  const handleAnswerSelected = (answer) => {
    setSelectedAnswer(answer);
  }

  const checkBuzzed = async () => {
    try {
      const result = await getBuzzed(login, gameId);
      if (result.player) {
        setCanAnswer(result.player.login === login);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleBuzzin = async () => {
    try {

      const playGame = await buzzIn(login, gameId);
      if (playGame.msg === ROUTES.NOT_ENOUGH_PLAYER_MESSAGE) {
        window.alert(ROUTES.NOT_ENOUGH_PLAYER_MESSAGE)
      }
      if (playGame.msg === ROUTES.GAME_FINISH_MESSAGE) {
        window.alert(ROUTES.GAME_FINISH_MESSAGE)
      }
      if (playGame.msg === ROUTES.LATE_MESSAGE) {
        window.alert(ROUTES.LATE_MESSAGE);
      }
      if (playGame.players.length) {
        const currentPlayer = playGame.players.find(p => p.login === login);
        window.localStorage.setItem(ROUTES.SCORE_STORAGE, currentPlayer.score)
      }
      // checkIfCanAnswer(playGame.players)
      await checkBuzzed();
      console.log('playGame', playGame)
    } catch (e) {
      console.log(e);
    }
  }

  const handleGamePlay = async (currentScore) => {
    await gamePlay(login, currentScore, gameId);
  }

  const handleAnswerSubmit = async () => {
    try {
      const isCorrect = await checkAnswer(selectedAnswer.answerid, selectedQuestion.questionid);
      console.log(selectedAnswer.answerid, selectedQuestion.questionid);
      let currentScore = parseInt(window.localStorage.getItem(ROUTES.SCORE_STORAGE));
      if (isCorrect) {
        currentScore = currentScore + selectedQuestion.pointvalue;
        window.localStorage.setItem(ROUTES.SCORE_STORAGE, currentScore);
        window.alert(`Correct! You earned ${selectedQuestion.pointvalue}.`);
        await handleGamePlay(currentScore)
      } else {
        window.alert('Sorry wrong answer');
      }
      setCanRelease(true);
      setCanAnswer(false);
      setCanBuzzIn(false);
    } catch (error) {
      throw Error;
    }
  }

  const handleReleaseBuzz = async () => {
    try {
      const game = await buzzRelease(gameId);
      if (game.status === ROUTES.GAME_STATUS.FINISHED) {
        window.alert(`Congratuation the winner is ${game.winner}`)
      } else {
        History.push(generatePath(ROUTES.GAME, { sessionId: ROUTES.SESSION_ID }));
      }
    } catch (e) {
      console.log(e);
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
                      <FormControlLabel disabled={!canAnswer} key={a.answerid} className={styles.formControl} control={<Checkbox />} label={`${a.answerchoices}`} onChange={() => handleAnswerSelected(a)}/>
                    )
                  })}
                </FormGroup>
              </div>
              <br />
              { <BuzzButton handleBuzzin={handleBuzzin} /> }
              <br />
              {canAnswer && <Button variant="contained" onClick={() => handleAnswerSubmit()}>Answer</Button>}
              <br />
              {canRelease && <Button variant="contained" onClick={() => handleReleaseBuzz()}>Continue</Button>}
            </>
          )}
        </div>
      )}
    </Container>
  );
}



export default withRouter(SelectQuestion);