import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Plants } from './plants';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { createForms } from 'react-redux-form';
import { InitialFeedback, PlantForm, UpdatePlantForm } from './forms';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { favorites } from './favorites';
import { updates } from './updates';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            plants: Plants,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            auth: Auth,
            favorites,
            updates,
            ...createForms({
                feedback: InitialFeedback,
                plantform: PlantForm,
                updateplantform:UpdatePlantForm
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}