import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <header className="header">
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/players">Players and Teams</Link>
            </li>
            <li>
              <Link to="/pasttourneys">Past Tourneys</Link>
            </li>
            <li>
              <Link to="/add">Creator</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
