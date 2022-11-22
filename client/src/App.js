import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import PerrosCreate from './components/PerrosCreate/PerrosCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route path= '/home' component={Home}/>
        <Route path= '/create' component={PerrosCreate}/>
        <Route exact path= '/dogs/:id' render={({match})=><Detail id={match.params.id}/>}/>
      </Switch></div></BrowserRouter>
  );
}

export default App;
