import smashbros from "../images/games/smashbros.png";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const PastTourneysPage = () => {
  const history = useHistory();
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
        tourneyName: data[key].tourneyName,
        tourneyType: data[key].tourneyType,
        tourneyDesc: data[key].tourneyDescription,
        maxPlayers: data[key].maxPlayers,
        startDate: convertDateFormat(data[key].startDate),
        endDate: convertDateFormat(data[key].endDate),
        location: data[key].location,
        invitation: data[key].invitation,
        ended: data[key].ended,
        game: data[key].game,
        players: data[key].players,
        winner: data[key].winner,
        type: data[key].tourneyType,
      });
    }

    const fixedTourneys = fetchedTourneys.filter(
      (tourney) => tourney.ended === true
    ).reverse();
    setTourneys(fixedTourneys);
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
    fetchTourneys();
  }, []);

  const tourneyHandler = (key) => {
    history.push("/tourney/" + key);
  };

  return (
    <div className="gamesListContainer">
      <h1>Past Tourneys</h1>
      <div className="gamesList">
        <div className="pastTourneysContainer">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Game</th>
                <th>Tourney</th>
                <th>Players</th>
                <th>Type</th>
                <th>Date</th>
                <th>Location</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {tourneys.map((tourney, index) => (
                <tr onClick={() => tourneyHandler(tourney.id)} key={tourney.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={smashbros}></img>
                  </td>

                  <td>
                    <p>{tourney.tourneyName}</p>
                  </td>
                  <td>
                    {tourney.players.length} / {tourney.maxPlayers}
                  </td>
                  <td>{tourney.type}</td>
                  <td>
                    {tourney.startDate} - {tourney.endDate}
                  </td>
                  <td>{tourney.location}</td>
                  <td>{tourney.winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PastTourneysPage;
