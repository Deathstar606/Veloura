//import logo from './logo.svg';
//import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponenet';
//import {DISHES} from './shared/dishes'
import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigStore } from './Redux/configureStore';

const store = ConfigStore();

class App extends Component {

  render() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
    </Provider>
  );
}
}
export default App;