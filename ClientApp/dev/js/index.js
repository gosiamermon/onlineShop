import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { rootReducer } from './reducers';
import { App } from './components/App';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension'

const history = createHistory();
const logger = createLogger();

const store = createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            promise,
            logger)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
