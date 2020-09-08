import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, thunk, logger),
);
sagaMiddleware.run(rootSaga);
export default store;
