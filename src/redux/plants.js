import { PLANTS } from '../shared/plants';
import * as ActionTypes from './ActionTypes';

export const Plants = (state = { isLoading: true,
    errMess: null,
    plants:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PLANTS:
            return {...state, isLoading: false, errMess: null, plants: action.payload};

        case ActionTypes.PLANTS_LOADING:
            return {...state, isLoading: true, errMess: null, plants: []}

        case ActionTypes.PLANTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};