const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";
const API_LOGIN_CALL_REQUEST = "API_LOGIN_CALL_REQUEST";
const API_LOGIN_CALL_SUCCESS = "API_LOGIN_CALL_SUCCESS";
const API_LOGIN_CALL_FAILURE = "API_LOGIN_CALL_FAILURE";
const API_FETCH_STUDENTS_CALL_SUCCESS = "API_FETCH_STUDENTS_CALL_SUCCESS";
const API_DELETE_STUDENT_CALL_SUCCESS = "API_DELETE_STUDENT_CALL_SUCCESS";

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

    switch(action.type) {
        case API_CALL_REQUEST: 
            return {
                ...state,
                fetching: true,
                error: null
            }
        
        case API_CALL_SUCCESS:
            return {
                ...state,
                fetching: false,
                students: action.student
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
        case API_CALL_FAILURE:
            return {
                ...state,
                fetching: false,
                students: null,
                error: action.error
            }
        case API_FETCH_STUDENTS_CALL_SUCCESS:
            return {
                ...state,
                fetching: false,
                students: action.students
            }
        case API_DELETE_STUDENT_CALL_SUCCESS:
            return {
                ...state,
                students: state.students.filter(
                    (student) => {
                        if (student.id !== action.id)
                            return true
                        else
                            return false
                    }
                ),
                fetching: false
            }
        default :
            return state
    }


}
export default StudentAPI;