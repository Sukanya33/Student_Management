
import { takeLatest, call, put, select } from "redux-saga/effects";
import axios from "axios";

export function* updateStudentWatcherSaga() {
    yield takeLatest("API_UPDATE_STUDENT_CALL_REQUEST", updateStudentWorkerSaga);
}

function updateStudentDetails(token,student) {

    return axios({
        method: "patch",
        url: "https://mhvd-task-manager.herokuapp.com/users/" + student.id,
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
        data: {
              name: student.name,
              class: student.sclass,
              gender: student.gender,
              age: student.age,
              department: student.department,
              location: student.location
        }
        
        
    })
    

}

function* updateStudentWorkerSaga(data) {
    try{
        const id = data.student.id;
        const name = data.student.name;
        const sclass = data.student.class;
        const gender = data.student.gender;
        const location = data.student.location;
        const department = data.student.department;
        const age = data.student.age;

        const token = yield select(state => state.studentsAPI.loggedInUserToken)

        const student = {
            id,name,sclass,age,gender,department,location
        }
        
        const response = yield call (updateStudentDetails,token,student);
        console.log("response in update student saga", response);

        yield put({type:"API_UPDATE_STUDENT_CALL_SUCCESS",student: response.data.user})
        
    }
    catch (error) {
        //dispatch the failure action to the store with the error
        yield put({ type: "API_UPDATE_STUDENT_CALL_FAILURE", error_msg: error })

    }
    
}