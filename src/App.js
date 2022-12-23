import MainPage from "./pages/MainPage";
import TourneyPage from "./pages/TourneyPage";
import TourneyAdminPage from "./pages/TourneyAdminPage";
import PastTourneysPage from "./pages/PastTourneysPage";
import AddTourneyPage from "./pages/AddTourneyPage";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import PlayersPage from "./pages/PlayersPage";
import logo from "./images/tourney_logo.png";

function App() {
  return (
    <div>
      <div className="banner">
        <img className="logo" src={logo} alt="logo"></img>
        <h1>Tourney Manager</h1>
      </div>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/tourney/:id" component={TourneyPage} />
        <Route path="/tourneyadmin/:id" component={TourneyAdminPage} />
        <Route path="/pasttourneys" exact>
          <PastTourneysPage />
        </Route>
        <Route path="/players" exact>
          <PlayersPage />
        </Route>
        <Route path="/add" exact>
          <AddTourneyPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
