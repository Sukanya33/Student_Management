import {all, fork} from "redux-saga/effects";
import { loginWatcherSaga } from "./LoginSaga";
import { updateStudentWatcherSaga } from "./UpdateStudentSaga";
import { fetchStudentsWatcherSaga } from "./FetchStudentsWatcherSaga";
import { deleteStudentWatcherSaga } from "./DeleteStudentSaga";
import { createStudentWatcherSaga } from "./CreateStudentSaga";
import { logoutWatcherSaga } from "./LogoutSaga";

export default function* () {
    yield all([
        fork(loginWatcherSaga),
        fork(updateStudentWatcherSaga),
        fork(fetchStudentsWatcherSaga),
        fork(deleteStudentWatcherSaga),
        fork(createStudentWatcherSaga),
        fork(logoutWatcherSaga)
    ])
}