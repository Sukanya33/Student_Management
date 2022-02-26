import { takeLatest, put, call, select } from "redux-saga/effects";
import axios from "axios";

export function* logoutWatcherSaga() {
    yield takeLatest("API_LOGOUT_CALL_REQUEST", logoutWorkerSaga)
}

function performLogout(token){
    return axios({
        url: "https://mhvd-task-manager.herokuapp.com/users/logout",
        method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
    })
}

function* logoutWorkerSaga() {
    try {
        const token = yield select(state => state.studentsAPI.loggedInUserToken);
        const response = yield call(performLogout, token);

        yield put({ type:"API_LOGOUT_CALL_SUCCESS"})

    }
    catch(error){
        yield put({type: "API_LOGOUT_CALL_FAILURE"})

    }
}