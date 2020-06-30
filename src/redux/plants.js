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

            case ActionTypes.ADD_PLANT:
                var plant = action.payload;
                return { ...state, comments: state.plants.concat(plant)};

        default:
            return state;
    }
};