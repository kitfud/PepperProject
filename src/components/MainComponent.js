import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Garden from './GardenComponent';
import PlantDetails from './PlantDetailComponent';
import { PLANTS } from '../shared/plants';

import Header from './HeaderComponent';
import Footer from './FooterComponent';

import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

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

        const HomePage = () => {
            return(
                <Home 
                />
            );
          }



      return (
        <div>
          <Header/>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/garden' component={() => <Garden garden={this.state.garden} />} />
              <Redirect to="/home" />
          </Switch>
          <Footer/>
        </div>
      );
    }
  }
  
  export default Main;