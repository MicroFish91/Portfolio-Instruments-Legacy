import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import portfolioReducer from './portfolioReducer';
import auth from './auth';

export default combineReducers({
    portfolioReducer,
    auth,
    form: formReducer
});