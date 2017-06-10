import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import game from './ducks/game';

const store = createStore(combineReducers({game}),
	compose(applyMiddleware(thunk, logger),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
