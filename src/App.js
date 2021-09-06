
import './App.css';
import Layout from './library/layout/layout';
import Body from './page/body';
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
    <Layout/>
    <Body/>
    </Router>
    
    </>
  );
}

export default App;
