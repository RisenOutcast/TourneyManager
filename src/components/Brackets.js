import "../styles/Brackets.css";
import Match from "./Match";

export const SingleElimination = (props) => {
  return (
    <div>
      <div className="roundBox">
        <h1>Round {props.index + 1}</h1>
        {props.games.map((game, index) => (
            <Match gameData={game} index={index} />
      ))}
      </div>
    </div>
  );
};

export default SingleElimination;