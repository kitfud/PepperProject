import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';

export const fetchPlants = () => (dispatch) => {

  dispatch(plantsLoading(true));

  return firestore.collection('plants').get()
      .then(snapshot => {
          let plants = [];
          snapshot.forEach(doc => {
              const data = doc.data()
              const _id = doc.id
              plants.push({_id, ...data });
          });
          return plants;
      })
      .then(plants => dispatch(addPlants(plants)))
      .catch(error => dispatch(plantsFailed(error.message)));
}

export const plantsLoading = () => ({
    type: ActionTypes.PLANTS_LOADING
});

export const plantsFailed = (errmess) => ({
    type: ActionTypes.PLANTS_FAILED,
    payload: errmess
});

export const addPlants = (plants) => ({
    type: ActionTypes.ADD_PLANTS,
    payload: plants
});

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
    
});

export const fetchComments = () => (dispatch) => {    
  return firestore.collection('comments').get()
  .then(snapshot => {
      let comments = [];
      snapshot.forEach(doc => {
          const data = doc.data()
          const _id = doc.id
          comments.push({_id, ...data });
      });
      return comments;
  })
  .then(comments => dispatch(addComments(comments)))
  .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return firestore.collection('promotions').get()
      .then(snapshot => {
          let promos = [];
          snapshot.forEach(doc => {
              const data = doc.data()
              const _id = doc.id
              promos.push({_id, ...data });
          });
          return promos;
      })
      .then(promos => dispatch(addPromos(promos)))
      .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const postComment = (plantId, rating, comment,author) => (dispatch) => {

  if (!auth.currentUser) {
      console.log('No user logged in!');
      return;
  }

  return firestore.collection('comments').add({
      author: {
          '_id': auth.currentUser.uid,
          'firstname' : author
      },
      plant: plantId,
      rating: rating,
      comment: comment,
      createdAt: firebasestore.FieldValue.serverTimestamp(),
      updatedAt: firebasestore.FieldValue.serverTimestamp()
  })
  .then(docRef => {
      firestore.collection('comments').doc(docRef.id).get()
          .then(doc => {
              if (doc.exists) {
                  const data = doc.data();
                  const _id = doc.id;
                  let comment = {_id, ...data};
                  dispatch(addComment(comment))
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          });
  })
  .catch(error => { console.log('Post comments ', error.message);
      alert('Your comment could not be posted\nError: '+ error.message); })
}

export const deleteComment = (comment) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        alert("login to delete comments")
        return;
    }

    var user = auth.currentUser;
    console.log(user.email)
    console.log(user.displayName)
  

    return firestore.collection('comments').get()
    .then(snapshot => {
        console.log(comment.author.firstname);
    
            if(auth.currentUser.uid === comment.author._id || user.email=== comment.author.firstname){
            firestore.collection('comments').doc(comment._id).delete()
            .then(() => {
                dispatch(fetchComments());
            })
            }
            else
            {alert('can only delete your own comments')}
            
            
        
    })
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const deleteFavorite = (plantId) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    var user = auth.currentUser;

    return firestore.collection('favorites').where('user', '==', user.uid).where('plant', '==', plantId).get()
    .then(snapshot => {
        console.log(snapshot);
        snapshot.forEach(doc => {
            console.log(doc.id);
            firestore.collection('favorites').doc(doc.id).delete()
            .then(() => {
                dispatch(fetchFavorites());
            })
        });
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
  });

  export const postFeedback = (feedback) => (dispatch) => {
        
    return firestore.collection('feedback').add(feedback)
    .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!'); })
    .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};

  export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return firestore.collection('leaders').get()
    .then(snapshot => {
        let leaders = [];
        snapshot.forEach(doc => {
            const data = doc.data()
            const _id = doc.id
            leaders.push({_id, ...data });
        });
        return leaders;
    })
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
  }
  
  
  
  export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
  });
  
  export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
  });
  
  export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
  });
  
  export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}
  
export const receiveLogin = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        user
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(() => {
        var user = auth.currentUser;
        localStorage.setItem('user', JSON.stringify(user));
        // Dispatch the success action
        dispatch(fetchFavorites());
        dispatch(receiveLogin(user));
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    auth.signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    localStorage.removeItem('user');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const postFavorite = (plantId) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    return firestore.collection('favorites').add({
        user: auth.currentUser.uid,
        plant: plantId
    })
    .then(docRef => {
        firestore.collection('favorites').doc(docRef.id).get()
            .then(doc => {
                if (doc.exists) {
                    dispatch(fetchFavorites())
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
}



export const fetchFavorites = () => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    var user = auth.currentUser;

    dispatch(favoritesLoading(true));

    return firestore.collection('favorites').where('user', '==', user.uid).get()
    .then(snapshot => {
        let favorites = { user: user, plants: []};
        snapshot.forEach(doc => {
            const data = doc.data()
            favorites.plants.push(data.plant);
        });
        console.log(favorites);
        return favorites;
    })
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});

export const googleLogin = () => (dispatch) => {
    const provider = new fireauth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
            // Dispatch the success action
            dispatch(fetchFavorites());
            dispatch(receiveLogin(user));
        })
        .catch((error) => {
            dispatch(loginError(error.message));
        });
}