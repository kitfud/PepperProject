import React, { Component } from 'react';
import Garden from './GardenComponent';
import { PLANTS } from '../shared/plants';

import Header from './HeaderComponent';
import Footer from './FooterComponent';

import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';

import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';


class Main extends Component {

    constructor(props) {
      super(props);
      this.state = {
          garden: PLANTS,
          comments: COMMENTS,
          promotions: PROMOTIONS,
          leaders: LEADERS
      };
    }
  
    onDishSelect(plantId) {
      this.setState({ selectedPlant: plantId});
    }
  
    render() {

        const HomePage = () => {
            return(
                <Home 
                plant={this.state.garden.filter((plant) => plant.featured)[0]}
                promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
          }



      return (
        <div>
          <Header/>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/garden' component={() => <Garden garden={this.state.garden} />} />
              <Route exact path='/contactus' component={Contact} />
              <Redirect to="/home" />
          </Switch>
          <Footer/>
        </div>
      );
    }
  }
  
  export default Main;