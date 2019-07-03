import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import Routes from "./routes";
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware()(createStore);


ReactDOM.render(
    <Provider store = {createStoreWithMiddleware(reducers)}>
        <Routes/>
    </Provider>
    , document.getElementById('root'));
