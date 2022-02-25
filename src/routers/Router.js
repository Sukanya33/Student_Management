import React from "react";
import { useSelector }  from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouterLink from "../component/RouterLink";
import StudentDetails from "../component/StudentDetails";
import HelpPage from "../component/HelpPage";
import EditStudentPage from "../component/EditStudentPage";
import StudentForm from "../component/StudentForm";
import LoginPage from "../component/LoginPage";

const Router = () => {
    const token = useSelector(state => {
        return state.studentsAPI.loggedInUserToken
    });
    console.log("token from router",token)
    
    return (
        <div>
            <BrowserRouter>
            {console.log("token in router.js",token)}
                <div>
                    {token.length > 0 ? <RouterLink token={token} /> : null}
                    <Routes>
                        {token.length <= 0 ? <Route path="/" element={<LoginPage />} exact={true} /> : null}
                        {token.length > 0 ? <Route path="/dashboard" element={<StudentDetails token={token} />} /> : null}
                        {token.length > 0 ? <Route path="/create" element={<StudentForm />} /> : null}
                        {token.length > 0 ? <Route path="/edit/:id" element={<EditStudentPage token={token} />} /> : null}
                        {token.length > 0 ? <Route path="/help" element={<HelpPage />} /> : null}
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Router;


