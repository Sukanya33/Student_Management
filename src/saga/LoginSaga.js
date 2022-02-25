
import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

//watcher saga: watches for actions dispatched to the store, starts worker saga
export function* loginWatcherSaga() {
    yield takeLatest("API_LOGIN_CALL_REQUEST", loginWorkerSaga);
}

function fetchLogin(email, password) {
    return axios({
        method: "post",
        url: "https://mhvd-task-manager.herokuapp.com/users/login",
        data: {
            email: email,
            password: password
        }
    });
}

function* loginWorkerSaga(data) {
    try {
        const email = data.login_email;
        const password = data.login_password;

        const response = yield call(fetchLogin, email, password);
        const loggedInUserToken = response.data.token;

        // dispactch a success action to the store with the logged-in user token
        yield put({ type: "API_LOGIN_CALL_SUCCESS", user_token: loggedInUserToken });
    }
    catch (error) {
        //dispatch the failure action to the store with the error
        yield put({ type: "API_LOGIN_CALL_FAILURE", error_msg: error })

    }
}
