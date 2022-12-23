import "../styles/VideoGame.css";
import { useHistory } from "react-router-dom"
import smashbros from "../images/games/smashbros.png"

const Tournaments = (props) => {
  const history = useHistory();

  const tourneyHandler = () => {
      history.push("/tourney/" + props.tourney.id);
  }

  return (
    <div onClick={tourneyHandler} key={props.tourney.id} className="gameContainer">
      <img src={smashbros} alt="Cover art" />
      <div className="gameInfo">
        <h2>{props.tourney.tourneyName}</h2>
        <h4>Game: {props.tourney.game} </h4>
        <h3>Players: {props.tourney.players.length} / {props.tourney.maxPlayers}</h3>
        <p>Tourney type: {props.tourney.type}</p>
        <p className="gameGenre">Playtime:</p>
        <i> {props.tourney.startDate} - {props.tourney.endDate}</i>
        <p className="gameStudio">Location: {props.tourney.location}</p>
        <p className="gameStudio">Invitation: {props.tourney.invitation}</p>
      </div>
    </div>
  );
};

export default Tournaments;
