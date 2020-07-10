import * as ActionTypes from './ActionTypes';

export const favorites = (state = {
        isLoading: true,
        errMess: null,
        favorites: null,
        allfav:null,
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITES:
            return {...state, isLoading: false, errMess: null, favorites: action.payload};
        
        case ActionTypes.ADD_ALLFAV:
            let payload = action.payload
            return {...state, isLoading: false, errMess: null, allfav: payload};  
        
        case ActionTypes.ALLFAV_LOADING:
            return {...state, isLoading: true, errMess: null, allfav: null};

        case ActionTypes.FAVORITES_LOADING:
            return {...state, isLoading: true, errMess: null, favorites: null};

        case ActionTypes.FAVORITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, favorites: null};

        default:
            return state;
    }
}