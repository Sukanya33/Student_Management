import axios from 'axios';
import { takeLatest, call, put, select } from 'redux-saga/effects';

export function* deleteStudentWatcherSaga() {
  yield takeLatest('API_DELETE_STUDENT_CALL_REQUEST', deleteStudentWorkerSaga);
}

function deleteStudent(id, token) {
  return axios({
    method: 'delete',
    url: 'https://mhvd-task-manager.herokuapp.com/users/' + id,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
}

function* deleteStudentWorkerSaga(data) {
  try {
    const id = data.id;
    const token = yield select((state) => state.studentsAPI.loggedInUserToken);
    yield call(deleteStudent, id, token);

    yield put({ type: 'API_DELETE_STUDENT_CALL_SUCCESS', id: id });
  } catch (error) {
    yield put({ type: 'API_DELETE_STUDENT_CALL_FAILURE', error_msg: error });
  }
}
