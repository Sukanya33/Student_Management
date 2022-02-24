const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";

intialState = {
    fetching: false,
    students: true,
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
        case API_CALL_FAILURE:
            return {
                ...state,
                fetching: false,
                students: null,
                error: action.error
            }
        default :
            return state
    }


}
export default StudentAPI;