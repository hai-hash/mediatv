
import './App.css';
import PageAdmin from './page/pageAdmin';
import PageUser from './page/pageUser';
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/home"><PageUser /></Route>
        <Route path="/admin"><PageAdmin /></Route>
        <Route path="/"><Redirect to="/home" /></Route>
      </Switch>

    </>
  );
}

export default App;
