import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter} from 'react-router-dom';

import portfolioReducer from './reducers/portfolioReducer';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';

// **** Global Store Variables ****
// benchmarkName: e.g. "Permanent Portfolio"
// benchmarkTitles: e.g. "tsm", "itb"
// benchmarkRatios: e.g. 60, 40
// user: nameOfCurrentUser
// coreAssets: Array of Account Objects used to Display Table Rows when Adding a New Snapshot



var store = createStore(
    portfolioReducer, 
    {benchmarkName: "", benchmarkTitles: [], benchmarkRatios: [], user: "Matt", coreAssets: []},
    window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><BrowserRouter><Main /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
