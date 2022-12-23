import "../styles/TourneyPage.css";
import smashbros from "../images/games/smashbros.png";
import Modal from "../components/Modal"
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/AdminPage.css";

const TourneyAdminPage = () => {
  const { id } = useParams();
  const [tourney, setTourney] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState([false]);

  const tourneyDescriptionRef = useRef("");
  const startDateRef = useRef("");
  const endDateRef = useRef("");

  const [startDateString, setStartDateTextareaValue] = useState("");
  const [endDateString, setEndDateTextareaValue] = useState("");
  const [descriptionString, setDescriptionTextareaValue] = useState("");

  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  function handleTextareaChange(setTextareaValue) {
    return function (event) {
      setTextareaValue(event.target.value);
    };
  }

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
      tourneyDescription: data.tourneyDescription,
      maxPlayers: data.maxPlayers,
      startDate: convertDateFormat(data.startDate),
      endDate: convertDateFormat(data.endDate),
      location: data.location,
      invitation: data.invitation,
      game: data.game,
      winner: data.winner,
      type: data.tourneyType,
      rounds: data.rounds,
      players: players,
      ended: data.ended
    };

    setTourney(tourneyObject);
    setStartDateTextareaValue(tourneyObject.startDate);
    setEndDateTextareaValue(tourneyObject.endDate);
    setDescriptionTextareaValue(tourneyObject.tourneyDescription);
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

  let brackets = <h2>No games played yet</h2>;
  let players = "";

  // Functions  for editing game data
  const setGameP1Score = (index1, index2, score) => {
    const updatedTourney = { ...tourney };
    updatedTourney.rounds[index1].round[index2].p1score = score;
    setTourney(updatedTourney);
  };

  const setGameP2Score = (index1, index2, score) => {
    const updatedTourney = { ...tourney };
    updatedTourney.rounds[index1].round[index2].p2score = score;
    setTourney(updatedTourney);
  };

  const setGameWinner = (index1, index2, winner) => {
    const updatedTourney = { ...tourney };
    updatedTourney.rounds[index1].round[index2].winner = winner;
    setTourney(updatedTourney);
  };

  if (initialFetchDone === true) {
    if (tourney.rounds !== undefined) {
      brackets = tourney.rounds.map((allrounds, index1) => (
        <div className="tourneyAdminBox">
          <h2>Round: {index1 + 1}</h2>
          {allrounds.round.map((game, index2) => (
            <div className="roundAdminGameContainer">
              <h3>Game {index2 + 1}</h3>
              <div className="horizontallyGroupedElements">
                <p>Player: {game.player1} </p>
                <p>
                  Score:
                  <input
                    type="text"
                    value={game.p1score}
                    onChange={(event) =>
                      setGameP1Score(index1, index2, event.target.value)
                    }
                  />
                </p>
              </div>
              <div className="horizontallyGroupedElements">
                <p>Player: {game.player2} </p>
                <p>
                  Score:
                  <input
                    type="text"
                    value={game.p2score}
                    onChange={(event) =>
                      setGameP2Score(index1, index2, event.target.value)
                    }
                  />
                </p>
              </div>
              <p>
                Status:
                <input
                  type="text"
                  value={game.winner}
                  onChange={(event) =>
                    setGameWinner(index1, index2, event.target.value)
                  }
                />
              </p>
              <i>Status numbers correspond:</i>
              <i>0 = no one has won</i>
              <i>1 = player 1 won</i>
              <i>2 = player 2 won</i>
            </div>
          ))}
        </div>
      ));
    }

    if (tourney.players !== undefined) {
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
              <td>
                <input
                  type="text"
                  value={player.name}
                  onChange={(event) => handleChange(event, player.name, "name")}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={player.wins}
                  onChange={(event) => handleChange(event, player.name, "wins")}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={player.losses}
                  onChange={(event) =>
                    handleChange(event, player.name, "losses")
                  }
                />
              </td>
            </tr>
          ))
      );
    } else {
      players = <p>No Players Yet</p>;
    }

    if (tourney.startDate !== undefined) {
    }
  }

  // Player Wins and Losses editing
  function handleChange(event, name, field) {
    const updatedTourney = { ...tourney };
    const updatedPlayers = tourney.players.map((player) => {
      if (player.name === name) {
        return { ...player, [field]: event.target.value };
      }
      return player;
    });
    updatedTourney.players = updatedPlayers;
    setTourney(updatedTourney);
  }

  function saveChangesToDatabase() {
    tourney.tourneyDescription = descriptionString;
    tourney.startDate = startDateString;
    tourney.endDate = endDateString;
    submitHandler();
    return;
  }

  const submitHandler = async (event) => {
    const response = await fetch(
      "https://tourney-6182b-default-rtdb.europe-west1.firebasedatabase.app/tourneys/" +
        id +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify(tourney),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();
    await new Promise((r) => setTimeout(r, 1000));
    refreshPage();
    return;
  };

  function endTheTourney(){
    tourney.winner = tourney.players[0].name;
    tourney.ended = true;
    saveChangesToDatabase();
  }

  //#region Rounds creations

  function playerCountIsOdd(num) {
    return num % 2 !== 0;
  }

  function generateRoundOfGames() {
    const playersWithNoLosses = tourney.players.filter(
      (player) => parseInt(player.losses) === 0
    );
    if (playerCountIsOdd(playersWithNoLosses.length)) {
      if (tourney.rounds === undefined) {
        const round = generateBracketWithOdd(playersWithNoLosses);
        tourney.rounds = [{ round }];
      } else {
        const round = generateBracketWithOdd(playersWithNoLosses);
        tourney.rounds.push({ round });
      }
    } else {
      if (tourney.rounds === undefined) {
        const round = generateRoundWithEven(playersWithNoLosses);
        tourney.rounds = [{ round }];
      } else {
        const round = generateRoundWithEven(playersWithNoLosses);
        tourney.rounds.push({ round });
      }
    }
    saveChangesToDatabase();
    return;
  }

  function generateRoundWithEven(players) {
    const bracket = [];
    for (let i = 0; i < players.length; i++) {
      if (i % 2 === 0) {
        bracket.push({
          player1: players[i].name,
          player2: players[i + 1].name,
          p1score: 0,
          p2score: 0,
          winner: 0,
        });
      }
    }
    if (players.length % 2 !== 0) {
      bracket.push({
        player1: players[players.length - 1].name,
        player2: null,
        p1score: 0,
        p2score: 0,
        winner: 0,
      });
    }
    return bracket;
  }

  function generateBracketWithOdd(players) {
    const bracket = [];
    for (let i = 0; i < players.length - 1; i++) {
      if (i % 2 === 0) {
        bracket.push({
          player1: players[i].name,
          player2: players[i + 1].name,
          p1score: 0,
          p2score: 0,
          winner: 0,
        });
      }
    }
    return bracket;
  }

  //#endregion

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="tourneyContainer">
      <h1>Admin page for: {tourney.tourneyName}</h1>
      <img src={smashbros}></img>
      <div className="tourneyBox">
        <h2>Info</h2>
        <p>Tourney Type: {tourney.tourneyType}</p>
        <div className="horizontallyGroupedElements">
          <p className="dateTitle">Start date: </p>
          <textarea
            ref={startDateRef}
            value={startDateString}
            onChange={handleTextareaChange(setStartDateTextareaValue)}
            className="adminDate"
          ></textarea>
        </div>
        <div className="horizontallyGroupedElements">
          <p className="dateTitle">End date: </p>
          <textarea
            ref={endDateRef}
            value={endDateString}
            onChange={handleTextareaChange(setEndDateTextareaValue)}
            className="adminDate"
          ></textarea>
        </div>
      </div>
      <div className="tourneyBox">
        <h2>Description</h2>
        <textarea
          ref={tourneyDescriptionRef}
          className="adminDescription"
          value={descriptionString}
          onChange={handleTextareaChange(setDescriptionTextareaValue)}
        ></textarea>
      </div>
      <div className="tourneyBox">
        <h2>Winner</h2>
        <p>{tourney.winner}</p>
      </div>
      <div className="tourneyBox">
        <h2>Players</h2>
        <table>
          <tr>
            <th>#</th>
            <th>Player/Team</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
          {players}
        </table>
      </div>
      <div className="roundBoxContainer">{brackets}</div>
      <div className="buttonsContainer">
        <button onClick={generateRoundOfGames}>
          Generate next round of games
        </button>
        <button onClick={saveChangesToDatabase}>Save Changes</button>
        <button onClick={showModalHandler}>End the tournament</button>
      </div>
        {showModal && <Modal onCancel={cancelModalHandler} onConfirm={endTheTourney} onClick={cancelModalHandler}/>}
    </div>
  );
};

export default TourneyAdminPage;
