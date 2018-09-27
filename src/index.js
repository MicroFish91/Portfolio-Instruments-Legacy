import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><Dashboard /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
