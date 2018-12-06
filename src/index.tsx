// import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import App from './containers/App/App';
import rootReducer from './redux/reducers/index';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import './theme.less';

import * as moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, {}, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
