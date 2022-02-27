const API_LOGIN_CALL_REQUEST = "API_LOGIN_CALL_REQUEST";
const API_LOGIN_CALL_SUCCESS = "API_LOGIN_CALL_SUCCESS";
const API_LOGIN_CALL_FAILURE = "API_LOGIN_CALL_FAILURE";
const API_FETCH_STUDENTS_CALL_REQUEST = "API_FETCH_STUDENTS_CALL_REQUEST";
const API_FETCH_STUDENTS_CALL_SUCCESS = "API_FETCH_STUDENTS_CALL_SUCCESS";
const API_FETCH_STUDENTS_CALL_FAILURE = "API_FETCH_STUDENTS_CALL_FAILURE";
const API_CREATE_STUDENT_CALL_REQUEST = "API_CREATE_STUDENT_CALL_REQUEST";
const API_CREATE_STUDENT_CALL_SUCCESS = "API_CREATE_STUDENT_CALL_SUCCESS";
const API_CREATE_STUDENT_CALL_FAILURE = "API_CREATE_STUDENT_CALL_FAILURE";
const API_UPDATE_STUDENT_CALL_REQUEST = "API_UPDATE_STUDENT_CALL_REQUEST";
const API_UPDATE_STUDENT_CALL_SUCCESS = "API_UPDATE_STUDENT_CALL_SUCCESS";
const API_UPDATE_STUDENT_CALL_FAILURE = "API_UPDATE_STUDENT_CALL_FAILURE";
const API_DELETE_STUDENT_CALL_SUCCESS = "API_DELETE_STUDENT_CALL_SUCCESS";
const API_LOGOUT_CALL_SUCCESS = "API_LOGOUT_CALL_SUCCESS";


const intialState = {
    fetching: false,
    login_email: null,
    login_password: null,
    students: null,
    loggedInUser: null,
    loggedInUserToken: "",
    error: null
};

const StudentAPI = (state = intialState, action) => {

    switch (action.type) {
        case API_LOGIN_CALL_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case API_LOGIN_CALL_SUCCESS:
            return {
                ...state,
                fetching: false,
                loggedInUserToken: action.user_token,
                login_email: null,
                login_password: null
            }
        case API_LOGIN_CALL_FAILURE:
            return {
                ...state,
                fetching: false,
                loggedInUserToken: "",
                error: action.error_msg,
                login_email: null,
                login_password: null
            }
        case API_FETCH_STUDENTS_CALL_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case API_FETCH_STUDENTS_CALL_SUCCESS:
            return {
                ...state,
                fetching: false,
                students: action.students
            }
        case API_FETCH_STUDENTS_CALL_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error_msg
            }
        case API_CREATE_STUDENT_CALL_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case API_CREATE_STUDENT_CALL_SUCCESS:
            return {
                ...state,
                students: [
                    ...state.students,
                    action.student
                ],
                fetching: false
            }
        case API_CREATE_STUDENT_CALL_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error_msg
            }
        case API_UPDATE_STUDENT_CALL_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case API_UPDATE_STUDENT_CALL_SUCCESS:
            return {
                ...state,
                students: state.students.map((student) => {
                    if (student._id === action.student.id)
                        return action.student
                    else
                        return student
                }),
                fetching: false
            }
        case API_UPDATE_STUDENT_CALL_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error_msg
            }
        case API_DELETE_STUDENT_CALL_SUCCESS:
            return {
                ...state,
                students: state.students.filter((student) => student._id !== action.id),
                fetching: false
            };
        case API_LOGOUT_CALL_SUCCESS:
            return {
                loggedInUserToken: null,
                fetching: false
            }
        default:
            return state
    }


}
export default StudentAPI;