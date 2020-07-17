import React, { Component } from 'react';
import Garden from './GardenComponent';
import PlantDetails from './PlantDetailComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Upload from './UploadComponent';
import { actions } from 'react-redux-form';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import About from './AboutComponent';


import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {resolveNotifications, receiveLogin,resetProps,fetchAllFav, updateComment,deleteUpdate, postUpdate, fetchUpdates, facebookLogin, updatePlant, deletePlant, postPlant, postFeedback,fetchLeaders,postComment, fetchPlants,fetchComments, fetchPromos,loginUser, logoutUser, fetchFavorites, googleLogin, postFavorite, deleteFavorite,deleteComment, updateMainPlantImage, toggleSeen, refreshUpdates} from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({

  refreshUpdates: (user) => dispatch(refreshUpdates(user)),
  toggleSeen: ()=> dispatch(toggleSeen()),
  resolveNotifications: (user)=> dispatch(resolveNotifications(user)),
  receiveLogin: (creds) => dispatch(receiveLogin(creds)),

  postComment: (plantId, author, comment,plant) => dispatch(postComment(plantId, author, comment,plant)),
  postUpdate: (plantId, image, comment) => dispatch(postUpdate(plantId, image, comment)),
  resetProps: ()=> dispatch(resetProps()),

  fetchUpdates: () =>dispatch(fetchUpdates()),
  updateComment: (plantId, image, comment)=>dispatch(updateComment(plantId,image,comment)),

  fetchPlants: () => { dispatch(fetchPlants())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  resetPlantForm: () => { dispatch(actions.reset('plantform'))},
  resetUpdatePlantForm:()=>{dispatch(actions.reset('updateplantform'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (firstname, lastname, telnum, email, agree,contactType,message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree,contactType,message)),
  
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),

  fetchFavorites: () => dispatch(fetchFavorites()),

  fetchAllFav:()=>dispatch(fetchAllFav()),

  googleLogin: () => dispatch(googleLogin()),
  facebookLogin: () => dispatch(facebookLogin()),
  postFavorite: (plantId) => dispatch(postFavorite(plantId)),
  deleteFavorite: (plantId) => dispatch(deleteFavorite(plantId)),

  deleteComment: (commentId)=>dispatch(deleteComment(commentId)),

  deleteUpdate: (plantId, url) => dispatch(deleteUpdate(plantId,url)),
  
  deletePlant: (plantId, url) => dispatch(deletePlant(plantId,url)),
  postPlant: (source,image, name, description, scoville, category,submittedBy,sown,transplant,fruits)=>dispatch(postPlant(source,image, name,description,scoville,category,submittedBy,sown,transplant,fruits)),
  updatePlant:(plantId, source,name, description, scoville, category,sown,transplant,fruits)=> dispatch(updatePlant(plantId, source,name, description, scoville, category,sown,transplant,fruits)),

  updateMainPlantImage:(plantId,currentURL,updateURL,comment)=> dispatch(updateMainPlantImage(plantId, currentURL,updateURL,comment))

});

const mapStateToProps = state => {
  return {
    recent: state.plants.recent,
    submitted:state.plants.submitted,
    garden: state.plants,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    allfav: state.favorites.allfav,
    auth: state.auth,
    updates: state.updates,
   

   
  }
}


class Main extends Component {
  constructor(props) {
    super(props);

    if(localStorage.getItem('user') != null){
      this.props.receiveLogin(JSON.parse(localStorage.getItem('user')));  
      
    }

  

  }


  componentDidMount() {
    this.props.fetchAllFav();
    this.props.fetchPlants();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
    this.props.fetchUpdates();   
    
   

  }

  componentDidUpdate(prevProps) {
    //Typical usage, don't forget to compare the props
    if(this.props.auth.user){
      if (this.props.comments !== prevProps.comments) {
        this.props.refreshUpdates(this.props.auth.user.displayName ? this.props.auth.user.displayName : this.props.auth.user.email)
      }
    }
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
            postUpdate = {this.props.postUpdate}
            updates = {this.props.updates.updates.filter((update) => update.plant === match.params.plantId)}
            deleteUpdate = {this.props.deleteUpdate}
            updateMainPlantImage = {this.props.updateMainPlantImage}
            updateComment = {this.props.updateComment}
            allfavorites = {this.props.allfav}
            login = {this.props.receiveLogin}
            
            favorite={this.props.favorites.favorites.plants.some((plant) => plant === match.params.plantId)}
            postFavorite={this.props.postFavorite}
            deleteFavorite={this.props.deleteFavorite}
            auth={this.props.auth} 
            updatePlant = {this.props.updatePlant}
            resetUpdatePlantForm = {this.props.resetUpdatePlantForm}
            />
          :
          <PlantDetails plant={this.props.garden.plants.filter((plant) => plant._id === match.params.plantId)[0]}
            isLoading={this.props.garden.isLoading}
            errMess={this.props.garden.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.plant === match.params.plantId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            deleteComment = {this.props.deleteComment}
            postUpdate = {this.props.postUpdate}
            updates = {this.props.updates.updates.filter((update) => update.plant === match.params.plantId)}
            deleteUpdate = {this.props.deleteUpdate}
            updateMainPlantImage = {this.props.updateMainPlantImage}
            updateComment = {this.props.updateComment}
            allfavorites = {this.props.allfav}
            login = {this.props.receiveLogin}
            

            favorite={false}
            postFavorite={this.props.postFavorite}
            deleteFavorite={this.props.deleteFavorite}
            auth={this.props.auth} 
            updatePlant = {this.props.updatePlant}
            resetUpdatePlantForm = {this.props.resetUpdatePlantForm}
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
                :
               
               
                    <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location}
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
          facebookLogin = {this.props.facebookLogin}
          comments = {this.props.comments}
          plants = {this.props.garden}
          receiveLogin = {this.props.receiveLogin}
          resolveNotifications = {this.props.resolveNotifications}
          toggleSeen = {this.props.toggleSeen}
          />
          <TransitionGroup location={this.props.location}>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/garden/:plantId' component={PlantWithId} />
              <Route exact path='/garden' component={() => <Garden   plantsLoading={this.props.garden.isLoading}
                plantsErrMess={this.props.garden.errMess} garden={this.props.garden} deletePlant ={this.props.deletePlant} />} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders}  />} />
              <PrivateRoute exact path='/upload' component = {()=><Upload auth={this.props.auth} resetProps = {this.props.resetProps} postPlant = {this.props.postPlant} resetPlantForm={this.props.resetPlantForm} recent={this.props.recent} submitted = {this.props.submitted}/>} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} plants={this.props.garden} deleteFavorite={this.props.deleteFavorite} auth ={this.props.auth} />} />
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