import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Garden from './GardenComponent';
import PlantDetails from './PlantDetailComponent';
import { PLANTS } from '../shared/plants';

import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {

    constructor(props) {
      super(props);
      this.state = {
          garden: PLANTS,
          selectedPlant: null
      };
    }
  
    onDishSelect(plantId) {
      this.setState({ selectedPlant: plantId});
    }
  
    render() {
      return (
        <div>
          <Header/>
          <Garden garden={this.state.garden} onClick={(plantId) => this.onDishSelect(plantId)} />
          <PlantDetails plant={this.state.garden.filter((plant) => plant.id === this.state.selectedPlant)[0]} />
          <Footer/>
        </div>
      );
    }
  }
  
  export default Main;