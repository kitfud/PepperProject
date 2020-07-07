
import * as ActionTypes from './ActionTypes';

export const updates = (state = { errMess: null, images:[]}, action) => {
 
        switch (action.type) {
          
                case ActionTypes.ADD_UPDATES:
                  return {...state, errMess: null, images: action.payload};
            
                case ActionTypes.UPDATES_FAILED:
                  return {...state, errMess: action.payload};
            
                case ActionTypes.ADD_UPDATE:
                    var plantImage = action.payload;
                    return { ...state, images: state.images.concat(plantImage)};
            
                default:
                  return state;
      }
};