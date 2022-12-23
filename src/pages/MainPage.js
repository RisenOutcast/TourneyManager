import TourneyList from "../components/TourneyList";
import { useState, useEffect } from "react";


const MainPage = () => {
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
        type: data[key].tourneyType
      });
    }

    setTourneys(fetchedTourneys);
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

  return (
    <div>
      <div>
        <TourneyList tourneys={tourneys} />
      </div>
    </div>
  );
};

export default MainPage;
