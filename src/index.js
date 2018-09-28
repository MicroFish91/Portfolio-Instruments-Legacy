import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import portfolioReducer from './reducers/portfolioReducer';
import Dashboard from './components/Dashboard';
import registerServiceWorker from './registerServiceWorker';

var store = createStore(
    portfolioReducer, 
    {benchmarkTitles: [], benchmarkRatios: [], user: "Matt"},
    window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><BrowserRouter><Dashboard /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
