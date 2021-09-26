
import './App.css';
import HomeAdmin from './page/homeadmin';
import HomeUser from './page/homeuser';
import {Switch,Route,Link,Redirect} from "react-router-dom";

function App() {
  return (
    <>
    <Switch>
      <Route path="/home"><HomeUser/></Route>
      <Route path="/admin"><HomeAdmin/></Route>
      <Route path="/"><Redirect to="/home"/></Route>
    </Switch>
    
    </>
  );
}

export default App;
