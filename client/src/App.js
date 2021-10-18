import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home'
import Nav from './components/Nav'


import AddLocation from './components/AddLocation';
import ListLocations from './components/ListLocations';
import LocationDetail from './components/LocationDetail';

import AddEvent from './components/AddEvent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/addLocation" component={AddLocation} />
          <Route exact path="/locations" component={ListLocations} />
          <Route exact path="/locations/:id" render={props => <LocationDetail {...props} />} />

          <Route exact path="/addEvent" component={AddEvent} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
