import * as ActionTypes from './ActionTypes';
import { PLANTS } from '../shared/plants';
import { baseUrl } from '../shared/baseUrl';

export const fetchPlants = () => (dispatch) => {

    dispatch(plantsLoading(true));
    
    return fetch(baseUrl + 'plants')
    .then(response => response.json())
    .then(dishes => dispatch(addPlants(dishes)));
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

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
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
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
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
