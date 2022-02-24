import { createStore,combineReducers } from "redux";
import StudentAPI from "../reducer/studentAPI";

const store = () => {
    const store = createStore(
        combineReducers({
            studentsAPI: StudentAPI
        })
    )
}
export default store;