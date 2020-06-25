import {createStore, combineReducers} from 'redux';
import { Plants } from './plants';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            plants: Plants,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );

    return store;
}