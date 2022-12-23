import smashbros from "../images/games/smashbros.png";
import "../styles/PastTourneys.css";
import { useHistory } from "react-router-dom";

const PastTourneys = (props) => {
  const history = useHistory();

  const tourneyHandler = (key) => {
    history.push("/tourney/" + key);
  };

  const firstTen = props.endedTrue.slice(0, 10);

  return (
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
          {firstTen.map((tourney, index) => (
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
  );
};

export default PastTourneys;
