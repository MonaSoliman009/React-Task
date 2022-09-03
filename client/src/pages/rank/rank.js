import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { instance } from "../../axios/axiosInstance";
const Rank = () => {
  //get score from redux
  var score = useSelector((state) => state.score);
  const [rank, setRank] = useState(0);
  const history = useHistory();
  //get rank value from api
  function getRank() {
    instance.post("rank", { finalScore: score }).then((res) => {
      setRank(res.data.rank);
    });
  }
  useEffect(() => {
    getRank();
  }, []);
  //navigate to practice screen if he/she wants to play again
  const handleNavigation = () => {
    history.push("/");
  };
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 275, maxWidth: 500, padding: 5, margin: "auto" }}
    >
      <CardContent>
        <Typography variant="h3" sx={{ mb: 1.5 }} color="#0d6efd">
          Your Score Is {rank}
        </Typography>
      </CardContent>
      <CardActions>
        <Fab
          onClick={() => handleNavigation()}
          variant="extended"
          color="primary"
        >
          <NavigationIcon sx={{ mr: 1 }} />
          Play Again
        </Fab>
      </CardActions>
    </Card>
  );
};

export default Rank;
