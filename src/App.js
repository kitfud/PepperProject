import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Garden from './components/GardenComponent';
import { PLANTS } from './shared/plants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garden: PLANTS
    };
  }
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
        <Garden garden={this.state.garden}/>
      </div>
    );
  }

}

export default App;
