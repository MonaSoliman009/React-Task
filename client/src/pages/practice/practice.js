import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useDispatch } from "react-redux";
import scoreAction from "./../../store/action";
import { instance } from "../../axios/axiosInstance";

import "./practice.css";
const Practice = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");
  const [options, setOptions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  //get words array from api
  function getWords() {
    instance.get("words").then((res) => {
      setWords(res.data);
    });
  }
  useEffect(() => {
    getWords();
    setOptions(
      ["verb", "adjective", "noun", "adverb"].sort(function () {
        return 0.5 - Math.random();
      })
    );
  }, []);

  // display the first question
  useEffect(() => {
    if (words && activeStep == 0) {
      setWord(words[0]);
    }
  }, [words]);

  //update progress
  useEffect(() => {
    if (correctAnswers) {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : (correctAnswers / 10) * 100
      );
      dispatch(scoreAction());
    }
  }, [correctAnswers]);
  //update store with the last score
  useEffect(() => {
    dispatch(scoreAction(progress));
  }, [progress]);

  //routing to rank screen after finishing practice
  useEffect(() => {
    if (activeStep === 10) {
      setActiveStep(0);
      history.push("/rank");
    }
  }, [activeStep]);

  const handleAnswer = (option) => {
    if (word.pos == option) {
      setAnswer(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setAnswer(false);
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      handleNext();
    }, 1500);

  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setWord(words[activeStep + 1]);
    setOptions(
      ["verb", "adjective", "noun", "adverb"].sort(function () {
        return 0.5 - Math.random();
      })
    );
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <Box className="my-5 m-auto" style={{ width: "80%" }}>
      <Stepper activeStep={activeStep}>
        {words.map((word, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>Question {index + 1}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === words.length ? (
        <></>
      ) : (
        <React.Fragment>
          <CardContent className="mx-5 my-5">
            <Typography variant="h5" component="div" className="fs-1">
              {word ? word.word : ""}
            </Typography>
          </CardContent>
          <Stack spacing={5} direction="row" className="mx-5 ">
            {options.map((option, index) => {
              return (
              
                  <Button
                    sx={{
                      fontSize: {
                        lg: 15,
                        md: 15,
                        sm: 15,
                        xs: 10,
                      },
                    }}
                    key={index}
                    size="medium"
                    variant="contained"
                    onClick={() => {
                      handleAnswer(option);
                    }}
                    disabled={open}
                  >
                    {option}
                  </Button>
               
              );
            })}
          </Stack>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}></Box>
        </React.Fragment>
      )}
      <Collapse style={{ width: "40%", margin: "auto" }} in={open}>
        {answer ? (
          <Alert sx={{ mb: 2 }}>Correct</Alert>
        ) : (
          <Alert severity="error">Wrong</Alert>
        )}
      </Collapse>
      <Box sx={{ width: "40%", margin: "auto" }}>
        <LinearProgressWithLabel value={progress} className="mt-5" />
      </Box>
    </Box>
  );
};

export default Practice;
