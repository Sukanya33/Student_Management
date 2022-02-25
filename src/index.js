
import reportWebVitals from './reportWebVitals';
import Router from './routers/Router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CreateSagaMiddleWare from 'redux-saga';
import './styles/styles.scss';
import { loginWatcherSaga } from './saga/LoginSaga'
import { updateStudentWatcherSaga } from './saga/UpdateStudentSaga';
import { createStore, combineReducers, applyMiddleware } from "redux";
import StudentAPI from "./reducer/studentAPI";
import sagas from './saga/Sagas';


// create the saga middleware
const sagaMiddleware = CreateSagaMiddleWare();

const store = createStore(
    combineReducers({
        studentsAPI: StudentAPI
    }),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

const jsx = (
<Provider store={store}>
    <Router />
</Provider>
);

ReactDOM.render( jsx, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

