import axios from "axios";
import { Saga } from "redux-saga";
import { takeLatest, put, call, select } from "redux-saga/effects";


export function* fetchStudentsWatcherSaga() {
    yield takeLatest("API_FETCH_STUDENTS_CALL_REQUEST",fetchStudentsWorkerSaga)
}

function fetchStudentsList(token) {
    return axios({
        method:"get",
        url:"https://mhvd-task-manager.herokuapp.com/users/all",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
    })
}

function* fetchStudentsWorkerSaga() {
    try{
            const token = yield select(state => state.studentsAPI.loggedInUserToken);
            const response = yield call(fetchStudentsList,token);
            // console.log("response in fetchstudentwatchersaga",response);
            yield put({ type: "API_FETCH_STUDENTS_CALL_SUCCESS", students: response.data})
    }
    catch(error){
        yield put({ type: "API_FETCH_STUDENTS_CALL_FAIURE", error_msg: error })
    }
}