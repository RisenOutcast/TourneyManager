import Tournaments from "./Tournaments";
import PastTourneys from "./PastTourneys";

const TourneyList = (props) => {
  const endedTrue = props.tourneys.filter((tourney) => tourney.ended === true).reverse();
  const endedFalse = props.tourneys.filter(
    (tourney) => tourney.ended === false
  ).reverse();

  return (
    <div className="gamesListContainer">
      <h1>Tourneys</h1>
      <div className="gamesList">
        {endedFalse.map((tourney, index) => (
          <Tournaments tourney={tourney} key={index}/>
        ))}
      </div>
      <h1>Past Tourneys</h1>
      <p>(10 most recent)</p>
      <div className="gamesList">
        <PastTourneys endedTrue={endedTrue} />
      </div>
    </div>
  );
};

export default TourneyList;
