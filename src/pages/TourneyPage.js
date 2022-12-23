import "../styles/TourneyPage.css";
import smashbros from "../images/games/smashbros.png";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Brackets from "../components/Brackets";

const TourneyPage = () => {
  const { id } = useParams();
  const [tourney, setTourney] = useState([]);
  const history = useHistory();
  const [initialFetchDone, setInitialFetchDone] = useState([false]);

  const fetchGames = async () => {
    if (initialFetchDone === true) {
      await new Promise((r) => setTimeout(r, 1000));
    }

    const response = await fetch(
      "https://tourney-6182b-default-rtdb.europe-west1.firebasedatabase.app/tourneys/" +
        id +
        ".json"
    );
    const data = await response.json();

    const players = data.players.map(({ name, wins, losses }) => {
      return { name, wins, losses };
    });

    const tourneyObject = {
      tourneyName: data.tourneyName,
      tourneyType: data.tourneyType,
      tourneyDesc: data.tourneyDescription,
      maxPlayers: data.maxPlayers,
      startDate: convertDateFormat(data.startDate),
      endDate: convertDateFormat(data.endDate),
      location: data.location,
      invitation: data.invitation,
      game: data.game,
      type: data.tourneyType,
      winner: data.winner,
      rounds: data.rounds,
      players: players,
    };

    setTourney(tourneyObject);
    setInitialFetchDone(true);
  };

  function convertDateFormat(date) {
    const dateParts = date.split("-");

    if (dateParts[1] === undefined) {
      return date;
    }

    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    const formattedDate = day + "." + month + "." + year;

    return formattedDate;
  }

  useEffect(() => {
    fetchGames();
  }, []);

  const tourneyAdminHandler = () => {
    history.push("/tourneyadmin/" + id);
  };

  let brackets = "";

  if (tourney.rounds != null) {
    brackets = tourney.rounds.map((allrounds, index) => (
      <Brackets games={allrounds.round} index={index} />
    ));
  } else {
    brackets = <h2>No games played yet</h2>;
  }

  let players = "";

  if (tourney.players != null) {
    tourney.players.sort((player1, player2) => {
      if (player1.wins > 0 || player2.wins > 0) {
        return player2.wins - player1.wins;
      } else if (player1.losses > 0 || player2.losses > 0) {
        return player1.losses - player2.losses;
      } else {
        return 0;
      }
    });

    players = tourney.players.map(
      (player, index) =>
        (players = (
          <tr>
            <td>{index + 1}</td>
            <td>{player.name}</td>
            <td>{player.wins}</td>
            <td>{player.losses}</td>
          </tr>
        ))
    );
  } else {
    players = <p>No Players Yet</p>;
  }

  let winner = "";

  if (tourney.winner !== null && tourney.winner !== undefined) {
    winner = (
      <div className="tourneyBox">
        <h2>Winner</h2>
        <p>{tourney.winner}</p>
      </div>
    );
  }

  return (
    <div className="tourneyContainer">
      <h1>{tourney.tourneyName}</h1>
      <img src={smashbros}></img>
      <div className="tourneyBox">
        <h2>Info</h2>
        <p>Tourney Type: {tourney.tourneyType}</p>
        <p>
          Playtime: {tourney.startDate} - {tourney.endDate}
        </p>
      </div>
      <div className="tourneyBox">
        <h2>Description</h2>
        <p>{tourney.tourneyDesc}</p>
      </div>
      {winner}
      <div className="tourneyBox">
        <h2>Ranking</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player/Team</th>
              <th>Wins</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody>{players}</tbody>
        </table>
      </div>
      <div className="roundBoxContainer">{brackets}</div>
      <div className="tourneyBox" onClick={tourneyAdminHandler}>
        <h2>Admin</h2>
      </div>
    </div>
  );
};

export default TourneyPage;
