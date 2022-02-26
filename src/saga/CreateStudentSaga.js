import { takeLatest, put, call, select } from "redux-saga/effects";
import axios from "axios";

export function* createStudentWatcherSaga(){
    yield takeLatest("API_CREATE_STUDENT_CALL_REQUEST",createStudentWorkerSaga);
}

function createStudent(token,student) {
    return axios({
        method : "post",
        url : "https://mhvd-task-manager.herokuapp.com/users",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        data : {
            name: student.name,
            class: student.sclass,
            gender: student.gender,
            age: student.age,
            department: student.department,
            location: student.location,
            email: student.email,
            password: student.password
        }
    })
}

function* createStudentWorkerSaga(data) {
    try{
        const email = data.student.email;
        const password = data.student.password;
        const name = data.student.name;
        const sclass = data.student.class;
        const gender = data.student.gender;
        const location = data.student.location;
        const department = data.student.department;
        const age = data.student.age;

        const token = yield select(state => state.studentsAPI.loggedInUserToken);
        const student = {
            name,email,password,sclass,gender,location,department,age
        }
        const response = yield call(createStudent,token,student);

        
        yield put({type:"API_CREATE_STUDENT_CALL_SUCCESS",student: response.data.user})

    }
    catch(error) {

    }
        
}