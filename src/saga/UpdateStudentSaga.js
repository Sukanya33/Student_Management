
import { takeLatest, call, put, select } from "redux-saga/effects";
import axios from "axios";

export function* updateStudentWatcherSaga() {
    yield takeLatest("API_UPDATE_STUDENT_CALL_REQUEST", updateStudentWorkerSaga);
}

function updateStudentDetails(token,id,name,sclass,age,gender,department,location) {

    return axios({
        method: "patch",
        url: "https://mhvd-task-manager.herokuapp.com/users/" + id,
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
        data: {
              name: name,
              class: sclass,
              gender: gender,
              age: age,
              department: department,
              location: location
        }
        
        
    })
    

}

function* updateStudentWorkerSaga(data) {
    try{
        const id = data.id;
        const name = data.name;
        const sclass = data.class;
        const gender = data.gender;
        const location = data.location;
        const department = data.department;
        const age = data.age;

        const token = yield select(state => state.studentsAPI.loggedInUserToken)
        
        const response = yield call (updateStudentDetails,token,id,name,sclass,age,gender,department,location);
        console.log("response in update student saga", response);
        
    }
    catch (error) {
        //dispatch the failure action to the store with the error
        yield put({ type: "API_UPDATE_STUDENT_CALL_FAILURE", error_msg: error })

    }
    
}