import "../styles/Brackets.css";
import { useState } from "react";

const Match = (props) => {
    // In the data theres a variable "winner" which has the following possible values:
    //  0 = no one has won
    //  1 = player 1 won
    //  2 = player 2 won
    //

    let p1winCont = "";
    let p1loseCont = "";
    let p2winCont = "";
    let p2loseCont = "";
    if(parseInt(props.gameData.winner) === 1){
      p1winCont = <p className="winner" id="p1winner">W</p>
      p2loseCont = <p className="loser" id="p2loser">L</p>
    }
    if(parseInt(props.gameData.winner) === 2){
      p2winCont = <p className="winner" id="p2winner">W</p>
      p1loseCont = <p className="loser" id="p1loser">L</p>;
    }

  return (
    <div className="roundGameContainer">
    <h2>Game #{props.index + 1}</h2>
    <div className="gameInfo">
      {p1winCont}
      {p1loseCont}
      <p className="playerName">{props.gameData.player1}</p>
      <p className="score"> {props.gameData.p1score} - {props.gameData.p2score} </p>
      <p className="playerName">{props.gameData.player2}</p>
      {p2loseCont}
      {p2winCont}
    </div>
  </div>
  );
};

export default Match;
