import * as ActionTypes from './ActionTypes';
import { PLANTS } from '../shared/plants';

export const fetchPlants = () => (dispatch) => {

    dispatch(plantsLoading(true));

    setTimeout(() => {
        dispatch(addPlants(PLANTS));
    }, 2000);
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

export const addComment = (plantId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        plantId: plantId,
        rating: rating,
        author: author,
        comment: comment
    }
});