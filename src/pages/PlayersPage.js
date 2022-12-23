import "../styles/Players.css";
import { useState, useEffect } from "react";

const PlayersPage = () => {
  const [tourneys, setTourneys] = useState([]);
  // This is for determining if we should delay the fetch process,
  // since when postin to the database, the data cannot be fetched
  // immediately. The service is too slow for that.
  const [initialFetchDone, setInitialFetchDone] = useState([false]);

  const fetchTourneys = async () => {
    if (initialFetchDone === true) {
      await new Promise((r) => setTimeout(r, 1000));
    }

    const response = await fetch(
      "https://tourney-6182b-default-rtdb.europe-west1.firebasedatabase.app/tourneys.json"
    );
    const data = await response.json();

    const fetchedTourneys = [];

    for (const key in data) {
      fetchedTourneys.push({
        id: key,
        players: data[key].players,
        winner: data[key].winner,
        ended: data[key].ended,
      });
    }

    const fixedTourneys = fetchedTourneys.filter(
      (tourney) => tourney.ended === true
    );
    setTourneys(fixedTourneys);
    setInitialFetchDone(true);
  };

  const combinedPlayers = tourneys.reduce((combined, tournament) => {
    tournament.players.forEach((player) => {
      if (player.name in combined) {
        combined[player.name].wins += player.wins;
        combined[player.name].losses += player.losses;
      } else {
        combined[player.name] = { ...player, tourneyswon: 0 };
      }
    });
    if (tournament.winner in combined) {
      combined[tournament.winner].tourneyswon++;
    }
    return combined;
  }, {});

  const sortedPlayers = Object.values(combinedPlayers).sort((a, b) => {
    if (a.tourneyswon > b.tourneyswon) {
      return -1;
    } else if (a.tourneyswon < b.tourneyswon) {
      return 1;
    } else {
      if (a.wins > b.wins) {
        return -1;
      } else if (a.wins < b.wins) {
        return 1;
      } else {
        if (a.losses > b.losses) {
          return 1;
        } else if (a.losses < b.losses) {
          return -1;
        } else {
          return 0;
        }
      }
    }
  });

  let players = "";

  players = sortedPlayers.map(
    (player, index) =>
      (players = (
        <tr>
          <td>{index + 1}</td>
          <td>{player.name}</td>
          <td>{player.tourneyswon}</td>
          <td>
            {player.wins}/{player.losses}
          </td>
        </tr>
      ))
  );

  useEffect(() => {
    fetchTourneys();
  }, []);

  return (
    <div className="gamesListContainer">
      <h1>Ranking</h1>
      <div className="gamesList">
        <div className="playersPageContainer">
          <table>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Tourneys Won</th>
              <th>Wins/Losses</th>
            </tr>
            {players}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
