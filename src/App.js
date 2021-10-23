import './App.css';
import {CreateTask, ListTask} from './pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">List Task</Link>
            </li>
            <li>
              <Link to="/create_task">Create Task</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/create_task">
            <CreateTask />
          </Route>
          <Route path="/">
            <ListTask />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
