import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Rank from './../pages/rank/rank';
const Protected = () => {
  var score = useSelector((state) => state.score);
  if (score) {
    return <Route exact path="/rank" component={Rank} />;
  } else {
    return (
      <Redirect
        to="/"
      />
    );
  }
};

export default Protected;
