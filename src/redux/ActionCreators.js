import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth, firebasestore,storage } from '../firebase/firebase';
import firebase from 'firebase';




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


export const postComment = (plantId, comment,author,plantOwner) => (dispatch) => {

//alert("plant owner: "+ plantOwner)

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


.then(()=>{
 //check the users document to see if updates flag is false,if false then turn true, update plant owner doc
 return firestore.collection('users').where('user', '==', plantOwner).get()
 .then(snapshot => {
   var id = [];
     snapshot.forEach(doc => {
         //const data = doc.data()
         const item = doc.id
         id.push(item)
         //console.log("document data:"+ JSON.stringify(data))
         //console.log("id:"+ JSON.stringify(id))
          
        
     });
     return id;
       
 })
 .then((id) => { 
 //id[0] is the first document to turn up with criteria for update

 
 if(id[0] !== undefined){
     return firestore.collection('users').doc(id[0]).update({
         updates: true,
     })
     
 }
 else{
  console.log("error updating comment update boolean")
 }

 })
      })
.then(()=>{
    //added to kick of the state change listener for user updates, on main component
    dispatch(fetchComments())
})
   
}

export const resolveNotifications =  (user) => () => {
///console.log(user)
let userName = user.displayName ? user.displayName : user.email

    
        return firestore.collection('users').where('user', '==', userName).get()
        .then(snapshot => {
          var id = [];
            snapshot.forEach(doc => {
                //const data = doc.data()
                const item = doc.id
                id.push(item)
                //console.log("document data:"+ JSON.stringify(data))
                //console.log("id:"+ JSON.stringify(id))
                 
               
            });
            return id;
              
        })
        .then((id) => { 
        //id[0] is the first document to turn up with criteria for update
       
        
        if(id[0] !== undefined){
            return firestore.collection('users').doc(id[0]).update({
                updates: false,
            })
            
        }
        else{
         console.log("error updating comment update boolean")
        }
       
        })
        .catch(()=>console.log("resolving updates toggle error!"))
            
}

export const postPlant = (source,url,name, description, scoville, category, submittedBy,sown,transplant,fruits) => (dispatch) => {

    /*if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }*/
    //dispatch(addPlantId("innerTEST"))

    return firestore.collection('plants').add({
        source:source,
        image: url,
        name: name,
        description: description,
        scoville: scoville,
        category:category,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
        modifiedAt: firebasestore.FieldValue.serverTimestamp(),
        submittedBy: submittedBy,

        sown: sown,
        transplant: transplant,
        fruits: fruits,
    })
    .then(docRef => {
        firestore.collection('plants').doc(docRef.id).get()
            .then(doc => {
                if (doc.exists) {
                  const data = doc.data();
                  const _id = doc.id;
                  
                  let plant = {_id, ...data};
                  
                  var d = {}; 
                  d.plant = plant
                  //console.log("d.plant="+d.pant)
                  d.individualId = _id
                  //console.log("d.individualId="+d.individualId)
                  
                  dispatch(addPlant(d)) 
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    })
    .then(docRef=>{
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
    })

    .catch(error => { console.log('Post plant ', error.message);
    alert('Your plant could not be posted\nError: '+ error.message); })

        
  }



export const deleteComment = (comment) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        alert("login to delete comments")
        return;
    }

    var user = auth.currentUser;
    //console.log(user.email)
    //console.log(user.displayName)
  

    return firestore.collection('comments').get()
    .then(snapshot => {
        //console.log(comment.author.firstname);
    
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

export const deletePlant = (plantId,url) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        alert("login to delete plants")
        return;
    }

    var user = auth.currentUser;
    //console.log(plantId)
    //console.log(user.email)
    //console.log(user.displayName)


    
    var docRef = firestore.collection("plants").doc(plantId);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            let data = doc.data()
            //console.log("Document data:", data.submittedBy);

            if(data.submittedBy === user.displayName || data.submittedBy === user.email){
                firestore.collection('plants').doc(plantId).delete()  
                .then(function(){
                    var desertRef = storage.refFromURL(url)
                    // Delete the file
                    desertRef.delete().then(function() {
                      console.log("file deleted")
                    }).catch(function(error) {
                      console.log("error deleting occured")
                    });
                })
                .then(function(){
                    dispatch(fetchPlants())
                })
                
                
                // Create a reference to the file to delete from the firestore, image/store

            }
            else{
                alert("you can only delete your own plants")
            }
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

   
  
};
export const updateMainPlantImage = (plantId, currentURL,updateURL,comment) =>(dispatch)=>{
  
    if (!auth.currentUser) {
        console.log('No user logged in!');
        alert("login to update plant")
        return;
    }

    var user = auth.currentUser;
    //console.log(plantId)
    //console.log(user.email)
    //console.log(user.displayName)

    
    var docRef = firestore.collection("plants").doc(plantId);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            let data = doc.data()
            //console.log("Document data:", data.submittedBy);

            if(data.submittedBy === user.displayName || data.submittedBy === user.email){
               return firestore.collection('plants').doc(plantId).update({
                    image: updateURL,
                    modifiedAt: firebasestore.FieldValue.serverTimestamp(),
                })
                .then(function() {
                    console.log("Document successfully updated!");
                    dispatch(deleteUpdate(plantId,updateURL))
                    dispatch(postUpdate(plantId,currentURL,comment))
                    dispatch(fetchPlants());
                    dispatch(fetchUpdates());
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            }
            else{
                alert("you can only edit your own plants")
            }
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

export const updatePlant = (plantId, source,name, description, scoville, category,sown,transplant,fruits) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        alert("login to update plant")
        return;
    }

    var user = auth.currentUser;
    //console.log(plantId)
    //console.log(user.email)
    //console.log(user.displayName)

    
    var docRef = firestore.collection("plants").doc(plantId);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            let data = doc.data()
            //console.log("Document data:", data.submittedBy);

            if(data.submittedBy === user.displayName || data.submittedBy === user.email){
               return firestore.collection('plants').doc(plantId).update({
                    source: source,
                    name:name,
                    description:description,
                    scoville: scoville,
                    category:category,
                    modifiedAt: firebasestore.FieldValue.serverTimestamp(),
                    sown: sown,
                    transplant: transplant,
                    fruits: fruits

                })
                .then(function() {
                    console.log("Document successfully updated!");
                    dispatch(fetchPlants());
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            }
            else{
                alert("you can only edit your own plants")
            }
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

  
};

export const deleteUpdate = (plantId,imageURL) => (dispatch) => {

    return firestore.collection('updates').where('plant', '==', plantId).where('images','==',imageURL).get()
    .then(snapshot => {
        //console.log(snapshot);
        snapshot.forEach(doc => {
            //console.log(doc.id);
            firestore.collection('updates').doc(doc.id).delete()
            .then(() => {

dispatch(fetchUpdates());
            })
        });
    })
    .catch(error => dispatch(updatesFailed(error.message)));
    
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



export const updateComment = (plantId,image,comment)=>(dispatch) =>{
    if(comment === undefined || comment.length ===0){
        comment="";
    }
    return firestore.collection('updates').where('plant', '==', plantId).where('images','==',image).get()
    .then(snapshot => {
        //console.log(snapshot);
        snapshot.forEach(doc => {
            //console.log(doc.id);
            firestore.collection('updates').doc(doc.id).update(
                {
                    comment: comment
                }
            )
            .then(() => {

dispatch(fetchUpdates());
            })
        });
    })
    .catch(error => dispatch(updatesFailed(error.message)));
}

export const postUpdate = (plantId, image, comment) => (dispatch) => {

if(comment === undefined || comment.length ===0){
    comment="";
}
    return firestore.collection('updates').add({
       
        plant: plantId,
        images: image,
        comment: comment
    })
    .then(docRef => {
        firestore.collection('updates').doc(docRef.id).get()
            .then(doc => {
                if (doc.exists) {
                    dispatch(addUpdate(doc))
                    dispatch(fetchUpdates())
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    })
    .catch(console.log("Error.nothing added"));


}


export const fetchUpdates =()=> (dispatch) =>{
    return firestore.collection('updates').get()
    .then(snapshot => {
        let updates = [];
        snapshot.forEach(doc => {
            const data = doc.data()
            const _id = doc.id
            updates.push({_id, ...data });
        });
        return updates;
    })
    .then(updates => dispatch(addUpdates(updates)))
    .catch(error => dispatch(updatesFailed(error.message)));
}

export const addUpdates = (update) => ({
    type: ActionTypes.ADD_UPDATES,
    payload: update
});

export const updatesFailed = (errmess) => ({
    type: ActionTypes.UPDATES_FAILED,
    payload: errmess
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

  export const postFavorite = (plantId) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
   
    return firestore.collection('favorites').add({
        user: auth.currentUser.uid,
        userName: auth.currentUser.displayName? auth.currentUser.displayName:auth.currentUser.email,
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
    .then(()=>dispatch(fetchAllFav()))
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (plantId) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    var user = auth.currentUser;

    return firestore.collection('favorites').where('user', '==', user.uid).where('plant', '==', plantId).get()
    .then(snapshot => {
        //console.log(snapshot);
        snapshot.forEach(doc => {
            //console.log(doc.id);
            firestore.collection('favorites').doc(doc.id).delete()
            .then(() => {
               
                dispatch(fetchFavorites())
                
              
              
               
                
            })
        });
    })
    .then(()=>dispatch(fetchAllFav()))
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {

    if (!auth.currentUser) {
        //console.log('No user logged in as auth.currentUser at present');
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
        //console.log(favorites);
        return favorites;
    })
    .then(favorites => dispatch(addFavorites(favorites)))
    
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const fetchAllFav = () => (dispatch) => {

    dispatch(allfavoritesLoading(true));
  
    return firestore.collection('favorites').get()
        .then(snapshot => {
            let fav = [];

            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                fav.push({_id, ...data });
            });
           //console.log(fav);
            return fav;
        })
        .then((fav) => dispatch(addAllFav(fav)))

        .catch(() => alert("error adding all fav"));
  }
  export const addAllFav = (fav) => ({
    type: ActionTypes.ADD_ALLFAV,
    payload: fav
});

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const allfavoritesLoading = () => ({
    type: ActionTypes.ALLFAV_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});
export const addUpdate = (image) => ({
    type: ActionTypes.ADD_UPDATE,
    payload: image
    
});
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
export const addPlantId = (plant) =>({
    type: ActionTypes.ADD_PLANTID,
    payload:plant
   
})

export const resetProps = () => ({
    type: ActionTypes.RESET_PROPS
})


  export const addPlant = (plant) => ({
    type: ActionTypes.ADD_PLANT,
    payload: plant
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


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
export const refreshUpdates = (user) =>(dispatch)=> {
    return firestore.collection('users').where('user', '==', user).get()
    .then(snapshot => {
      var id = []
        snapshot.forEach(doc => {
            //const data = doc.data()
            const item = doc.id
            id.push(item)
            //console.log("document data:"+ JSON.stringify(data))
            //console.log("id:"+ JSON.stringify(id))
             
           
        });
        return id;
          
    })
    .then((id) => { 
    //id[0] is the first document to turn up with criteria for update

    
   firestore.collection('users').doc(id[0]).get()
    .then((docRef) => {
        let data = docRef.data()
        let updates=  data.updates
    //console.log("UPDATeS ARE:"+ updates)
       dispatch(receiveUpdates(updates))
    })
    .catch((error) => {console.log("error on getting doc") })


})
}

export const loginUser = (creds) => (dispatch) => {
//console.log("loggin in")
    dispatch(requestLogin(creds)) 
    return firebase.auth().signInWithEmailAndPassword(creds.username, creds.password)
    .then(() => {

        var user = auth.currentUser;
        //console.log("user:"+ JSON.stringify(user))
        
        Promise.resolve(user).then(()=>{
        //console.log("inner user:" + user.email)

        return firestore.collection('users').where('user', '==', user.email).get()
        .then(snapshot => {
          var id = []
            snapshot.forEach(doc => {
                //const data = doc.data()
                const item = doc.id
                id.push(item)
                //console.log("document data:"+ JSON.stringify(data))
                //console.log("id:"+ JSON.stringify(id))
                 
               
            });
            return id;
              
        })
        .then((id) => { 
        //id[0] is the first document to turn up with criteria for update
  
        
       firestore.collection('users').doc(id[0]).get()
        .then((docRef) => {
            let data = docRef.data()
            let updates=  data.updates
        //console.log("UPDATeS ARE:"+ updates)
           dispatch(receiveUpdates(updates))
        })
        .catch((error) => {console.log("error on getting doc") })
        

        .then(()=>{
            if(id[0] !== undefined){
                return firestore.collection('users').doc(id[0]).update({
                    loginAt: firebasestore.FieldValue.serverTimestamp(),
                })
                
            }
            else{
                return firestore.collection('users').add({
                    user: user.email,
                    loginAt: firebasestore.FieldValue.serverTimestamp(),
                    updates: false
                
                }) 
            }
        })
        

        })
    
        .then(()=>{
        //console.log(JSON.stringify(user))
        localStorage.setItem('user', JSON.stringify(user));
        //Dispatch the success action
        dispatch(fetchFavorites());
        dispatch(receiveLogin(user))
        })
       

       
        .catch(error => dispatch(loginError(error.message)))   
  
}
)
})
}

export const receiveUpdates = (data) => {
    
    return {
        type: ActionTypes.DATA_SUCCESS,
        data
    }
}

export const toggleSeen = () => {
    
    return {
        type: ActionTypes.DATA_SEEN
    }
}

export const googleLogin = () => (dispatch) => {
    
    const provider = new fireauth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(async (result) => {
            var user = result.user;
            try {
            const snapshot = await firestore.collection('users').where('user', '==', user.displayName).get();
            var id = [];
            snapshot.forEach(doc => {
                //const data = doc.data()
                const item = doc.id;
                id.push(item);
                //console.log("document data:"+ JSON.stringify(data))
                //console.log("id:"+ JSON.stringify(id))
            });
            const id_1 = id;
            //id[0] is the first document to turn up with criteria for update
            if(id_1[0]){
                firestore.collection('users').doc(id_1[0]).get()
                .then((docRef) => {
                    let data = docRef.data();
                    let updates = data.updates;

                    //console.log("UPDATS ARE:"+ updates)
                    dispatch(receiveUpdates(updates)) 
                })
                .catch((error) => { console.log("error on getting updates doc"); })  
                .then(()=>{
                    return firestore.collection('users').doc(id_1[0]).update({
                        loginAt: firebasestore.FieldValue.serverTimestamp(),
                    })
                })
               
                .catch((error) => { console.log("error on getting doc"); })  
            }
            else {
                return firestore.collection('users').add({
                    user: user.displayName,
                    loginAt: firebasestore.FieldValue.serverTimestamp(),
                    updates: false
                });
            }
         


 





        }
        catch (error_1) {
            return dispatch(loginError(error_1.message));
        }   
     //console.log(JSON.stringify(user))
     localStorage.setItem('user', JSON.stringify(user));
     //Dispatch the success action
     dispatch(fetchFavorites());
     dispatch(receiveLogin(user));
        
       
    }
        )
    
}




export const facebookLogin =() => (dispatch)=>{
const provider = new fireauth.FacebookAuthProvider();  

auth.signInWithPopup(provider)
.then(async (result) => {
    var user = result.user;
    try {
    const snapshot = await firestore.collection('users').where('user', '==', user.displayName).get();
    var id = [];
    snapshot.forEach(doc => {
        //const data = doc.data()
        const item = doc.id;
        id.push(item);
        //console.log("document data:"+ JSON.stringify(data))
        //console.log("id:"+ JSON.stringify(id))
    });
    const id_1 = id;
    //id[0] is the first document to turn up with criteria for update
    if(id_1[0]){
        firestore.collection('users').doc(id_1[0]).get()
        .then((docRef) => {
            let data = docRef.data();
            let updates = data.updates;

            //console.log("UPDATS ARE:"+ updates)
            dispatch(receiveUpdates(updates)) 
        })
        .catch((error) => { console.log("error on getting updates doc"); })  
        .then(()=>{
            return firestore.collection('users').doc(id_1[0]).update({
                loginAt: firebasestore.FieldValue.serverTimestamp(),
            })
        })
       
        .catch((error) => { console.log("error on getting doc"); })  
    }
    else {
        return firestore.collection('users').add({
            user: user.displayName,
            loginAt: firebasestore.FieldValue.serverTimestamp(),
            updates: false
        });
    }
 








}
catch (error_1) {
    return dispatch(loginError(error_1.message));
}   
//console.log(JSON.stringify(user))
localStorage.setItem('user', JSON.stringify(user));
//Dispatch the success action
dispatch(fetchFavorites());
dispatch(receiveLogin(user));


}
)

}