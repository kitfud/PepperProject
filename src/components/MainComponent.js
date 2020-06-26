import React, { Component } from 'react';
import Garden from './GardenComponent';
import PlantDetails from './PlantDetailComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { actions } from 'react-redux-form';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import About from './AboutComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { postFeedback,fetchLeaders,postComment, fetchPlants,fetchComments, fetchPromos,loginUser, logoutUser, fetchFavorites, googleLogin, postFavorite, deleteFavorite,deleteComment } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({

  postComment: (plantId, rating, author, comment) => dispatch(postComment(plantId, rating, author, comment)),
  fetchPlants: () => { dispatch(fetchPlants())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (firstname, lastname, telnum, email, agree,contactType,message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree,contactType,message)),
  
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  googleLogin: () => dispatch(googleLogin()),
  postFavorite: (plantId) => dispatch(postFavorite(plantId)),
  deleteFavorite: (plantId) => dispatch(deleteFavorite(plantId)),

  deleteComment: (commentId)=>dispatch(deleteComment(commentId))

});

const mapStateToProps = state => {
  return {
    garden: state.plants,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth
  }
}


class Main extends Component {
  componentDidMount() {
    this.props.fetchPlants();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }
  
    onPlantSelect(plantId) {
      this.setState({ selectedPlant: plantId});
    }
  
    render() {
      const PlantWithId = ({match}) => {
        return(
          (this.props.auth.isAuthenticated && this.props.favorites.favorites)
          ?
          <PlantDetails plant={this.props.garden.plants.filter((plant) => plant._id === match.params.plantId)[0]}
            isLoading={this.props.garden.isLoading}
            errMess={this.props.garden.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.plant === match.params.plantId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            deleteComment = {this.props.deleteComment}


            favorite={this.props.favorites.favorites.plants.some((plant) => plant === match.params.plantId)}
            postFavorite={this.props.postFavorite}
            deleteFavorite={this.props.deleteFavorite}
            />
          :
          <PlantDetails plant={this.props.garden.plants.filter((plant) => plant._id === match.params.plantId)[0]}
            isLoading={this.props.garden.isLoading}
            errMess={this.props.garden.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.plant === match.params.plantId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            deleteComment = {this.props.deleteComment}

            favorite={false}
            postFavorite={this.props.postFavorite}
            deleteFavorite={this.props.deleteFavorite}
            />


      
        );
      };

        const HomePage = () => {
            return(
                <Home 
                plant={this.props.garden.plants.filter((plant) => plant.featured)[0]}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                
                plantsLoading={this.props.garden.isLoading}
                plantsErrMess={this.props.garden.errMess}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}

                leader={this.props.leaders.leaders.filter((leaders) => leaders.featured)[0]}
                leaderLoading={this.props.leaders.isLoading}
                leaderErrMess={this.props.leaders.errMess}
                />
            );
          }

          const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
          );
      

      return (
        <div>
          <Header
          auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          googleLogin={this.props.googleLogin}
          />
          <TransitionGroup location={this.props.location}>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/garden/:plantId' component={PlantWithId} />
              <Route exact path='/garden' component={() => <Garden garden={this.props.garden} />} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} plants={this.props.garden} deleteFavorite={this.props.deleteFavorite} />} />
              <Redirect to="/home" />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
          <Footer/>
        </div>
      );
    }
  }
  


  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));