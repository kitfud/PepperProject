import * as ActionTypes from './ActionTypes';

export const addComment = (plantId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        plantId: plantId,
        rating: rating,
        author: author,
        comment: comment
    }
});