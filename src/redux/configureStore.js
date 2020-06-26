import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Plants } from './plants';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            plants: Plants,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}