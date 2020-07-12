import * as ActionTypes from './ActionTypes';

export const Plants = (state = { isLoading: true,
    errMess: null,
    plants:[],
    recent:"notworking",   
    submitted:false,

}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PLANTS:
            let plants = action.payload
            return {...state, isLoading: false, errMess: null, plants: plants};

        case ActionTypes.PLANTS_LOADING:
            return {...state, isLoading: true, errMess: null, plants: []};

        case ActionTypes.PLANTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_PLANT:
                var plant = action.payload.plant;
                var id = action.payload.individualId;
            return { ...state, comments: state.plants.concat(plant),recent:id, submitted: true };
        
        case ActionTypes.ADD_PLANTID:
            return {...state,recent: action.payload};

        case ActionTypes.RESET_PROPS:
            return{...state, submitted:false};

        default:
            return state;
    }
};