import { takeLatest, put, call, select } from "redux-saga/effects";
import axios from "axios";

export function* createStudentWatcherSaga(){
    yield takeLatest("API_CREATE_STUDENT_CALL_REQUEST",createStudentWorkerSaga);
}


function* createStudentWorkerSaga(data) {
    try{
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const sclass = data.class;
        const gender = data.gender;
        const location = data.location;
        const department = data.department;
        const age = data.age;

        const token = yield select(state => state.studentsAPI.loggedInUser);
        const response = call(createStudent,name,email,password,sclass,gender,location,department,age);

    }
    catch(error) {
        
    }
        
}