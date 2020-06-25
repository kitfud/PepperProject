import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Garden from './components/GardenComponent';

class App extends Component {
  render(){
    return (
      <div className="App">
      <Navbar dark variant="dark">
      <div className ="container">
        <NavbarBrand href="/" >
          Kit's Garden
        </NavbarBrand>
      </div>
        </Navbar>
        <Garden/>
      </div>
    );
  }

}

export default App;
