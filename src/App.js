import './App.css';
import PageAdmin from './page/pageAdmin';
import PageUser from './page/pageUser';
import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from 'react';
import { PublicContext } from './publicContexts/contexts';
import { ToastContainer } from 'react-toastify';
import AccountLayout from './page/myaccount/accountLayout';
function App() {
  const { infoAccount } = useContext(PublicContext);
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path="/home"><PageUser /></Route>
        <Route path="/account/:type"><AccountLayout /></Route>
        <Route path="/admin" render={() => {
          return infoAccount?.role === "ADMIN" ? <PageAdmin /> : <Redirect to="/home" />
        }}></Route>
        <Route path="/"><Redirect to="/home" /></Route>
      </Switch>

    </>
  );
}

export default App;
