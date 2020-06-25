import React, { Component } from 'react';
import Garden from './GardenComponent';
import PlantDetails from './PlantDetailComponent';

import Header from './HeaderComponent';
import Footer from './FooterComponent';

import Home from './HomeComponent';
import Contact from './ContactComponent';

import { addComment } from '../redux/ActionCreators';
import About from './AboutComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => ({
  
  addComment: (plantId, rating, author, comment) => dispatch(addComment(plantId, rating, author, comment))

});

const mapStateToProps = state => {
  return {
    garden: state.plants,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


class Main extends Component {

  
    onPlantSelect(plantId) {
      this.setState({ selectedPlant: plantId});
    }
  
    render() {
      const PlantWithId = ({match}) => {
        return(
            <PlantDetails plant={this.props.garden.filter((plant) => plant.id === parseInt(match.params.plantId,10))[0]} 
              comments={this.props.comments.filter((comment) => comment.plantId === parseInt(match.params.plantId,10))} 
              addComment={this.props.addComment}
              />
        );
      };

        const HomePage = () => {
            return(
                <Home 
                plant={this.props.garden.filter((plant) => plant.featured)[0]}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
          }



      return (
        <div>
          <Header/>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/garden/:plantId' component={PlantWithId} />
              <Route exact path='/garden' component={() => <Garden garden={this.props.garden} />} />
              <Route exact path='/contactus' component={Contact} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Redirect to="/home" />
          </Switch>
          <Footer/>
        </div>
      );
    }
  }
  


  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));