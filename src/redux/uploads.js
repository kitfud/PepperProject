import * as ActionTypes from './ActionTypes';

export const uploads = (state = {
        isLoading: true,
        errMess: null,
        upload: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_UPLOAD:
            let image = action.payload;
            return {...state, isLoading: false, errMess: null, upload: image};

        case ActionTypes.UPLOAD_LOADING:
            return {...state, isLoading: true, errMess: null, upload: null};

        case ActionTypes.UPLOAD_FAILED:
            return {...state, isLoading: false, errMess: action.payload, upload: null};

        default:
            return state;
    }
}