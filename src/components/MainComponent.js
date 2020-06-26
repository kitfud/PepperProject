import React, { Component } from 'react';
import Garden from './GardenComponent';
import PlantDetails from './PlantDetailComponent';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { actions } from 'react-redux-form';
import Home from './HomeComponent';
import Contact from './ContactComponent';

import About from './AboutComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { postComment, fetchPlants,fetchComments, fetchPromos } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({

  postComment: (plantId, rating, author, comment) => dispatch(postComment(plantId, rating, author, comment)),
  fetchPlants: () => { dispatch(fetchPlants())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())

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
  componentDidMount() {
    this.props.fetchPlants();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  
    onPlantSelect(plantId) {
      this.setState({ selectedPlant: plantId});
    }
  
    render() {
      const PlantWithId = ({match}) => {
        return(
            <PlantDetails plant={this.props.garden.plants.filter((plant) => plant.id === parseInt(match.params.plantId,10))[0]} 
              comments={this.props.comments.comments.filter((comment) => comment.plantId === parseInt(match.params.plantId,10))} 
              postComment={this.props.postComment}
              commentsErrMess={this.props.comments.errMess}
              isLoading={this.props.garden.isLoading}
              errMess={this.props.garden.errMess}
              />
        );
      };

        const HomePage = () => {
            return(
                <Home 
                plant={this.props.garden.plants.filter((plant) => plant.featured)[0]}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                plantsLoading={this.props.garden.isLoading}
                plantsErrMess={this.props.garden.errMess}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
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
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Redirect to="/home" />
          </Switch>
          <Footer/>
        </div>
      );
    }
  }
  


  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));