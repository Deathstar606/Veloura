import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Sunglass } from './sunglass';
import { Orders } from './orders';
import { Clothes } from './clothes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigStore = () => {            //used in app.js
    const store = createStore(                //buit in function of redux
        combineReducers({
            auth: Auth,
            clothes: Clothes,
            sunglass: Sunglass,
            orders: Orders,
/*             promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            }) */
        }),
        applyMiddleware(thunk, logger)        //check explanation
    );

    return store;
}