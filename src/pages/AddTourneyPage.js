import "../styles/AddTourney.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const AddTourneyPage = () => {
  const tourneyNameRef = useRef("");
  const tourneyDescriptionRef = useRef("");
  const maxPlayersRef = useRef("");
  const typeRef = useRef("");
  const startDateRef = useRef("");
  const endDateRef = useRef("");
  const locationRef = useRef("");
  const invitationRef = useRef("");
  const gameRef = useRef("");
  const playersRef = useRef("");
  const history = useHistory();

  const makeATourneyObject = () => {
    const newTourney = {
      tourneyName: tourneyNameRef.current.value,
      tourneyDescription: tourneyDescriptionRef.current.value,
      maxPlayers: maxPlayersRef.current.value,
      tourneyType: typeRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      location: locationRef.current.value,
      invitation: invitationRef.current.value,
      game: gameRef.current.value,
      winner: null,
      ended: false,
      players: makePlayers(),
      rounds: [null]
    };
    return newTourney;
  };

  function makePlayers(){
    const playerNames = separatePlayers(playersRef.current.value);
    const players = [];
    for (let index = 0; index < playerNames.length; index++) {
      const player = {
        name: playerNames[index],
        wins: 0,
        losses: 0
      };
      players.push(player)
    }
    return players;
  }

  function separatePlayers(str) {
    return str.split(";");
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const newGame = makeATourneyObject();
    const response = await fetch(
      "https://tourney-6182b-default-rtdb.europe-west1.firebasedatabase.app/tourneys.json",
      {
        method: "POST",
        body: JSON.stringify(newGame),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();
    backToMain();
  };

  const backToMain = () => {
    history.push("/");
  };

  return (
    <div className="gamesListContainer">
      <div className="tourneyCreatorContainer">
        <h1>Create a new tourney</h1>
        <div className="formContainer">
          <form>
            <div>
              <label htmlFor="text">Tourney name</label>
              <input rows="5" id="text" ref={tourneyNameRef}></input>
            </div>
            <div>
              <label htmlFor="text">Description</label>
              <input rows="5" id="text" ref={tourneyDescriptionRef}></input>
            </div>
            <div>
              <label htmlFor="text">Game</label>
              <select name="Game" id="games" ref={gameRef}>
                <option value="Super Smash Bros. Melee">Super Smash Bros. Melee</option>
                <option value="Super Smash Bros. Brawl">Super Smash Bros. Brawl</option>
                <option value="Super Smash Bros. 4">Super Smash Bros. 4</option>
                <option value="Super Smash Bros. Ultimate">Super Smash Bros. Ultimate</option>
              </select>
            </div>
            <div>
              <label htmlFor="text">Max Players</label>
              <input rows="5" id="text" ref={maxPlayersRef}></input>
            </div>
            <div>
              <label htmlFor="text">Tourney Type</label>
              <select name="Game" id="games" ref={typeRef}>
                <option value="Single Elimination">Single Elimination</option>
              </select>
            </div>
            <div>
              <label htmlFor="text">Start date</label>
              <input type="date" id="date" ref={startDateRef} />
            </div>
            <div>
              <label htmlFor="text">End date</label>
              <input type="date" id="date" ref={endDateRef} />
            </div>
            <div>
              <label htmlFor="text">Location</label>
              <input rows="5" id="text" ref={locationRef}></input>
            </div>
            <div>
              <label htmlFor="text">Invitation</label>
              <select name="Invitation" id="invitation" ref={invitationRef}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label htmlFor="text">Players (List players names seperated with ";". This can be empty if you wish to add them later.)</label>
              <textarea name="Players" id="players" ref={playersRef}></textarea>
            </div>

            <button onClick={submitHandler}>Create Tourney</button>
          </form>
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default AddTourneyPage;
