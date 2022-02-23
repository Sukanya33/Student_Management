import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouterLink from "../component/RouterLink";
import StudentDetails from "../component/StudentDetails";
import HelpPage from "../component/HelpPage";
import EditStudentPage from "../component/EditStudentPage";
import LoginPage from "../component/LoginPage";
import StudentForm from "../component/StudentForm";



const Router = () => {
    const [token, setToken] = useState("");

    return (
        <div>
            <BrowserRouter>
                <div>
                    {token.length > 0 ? <RouterLink token={token} updateToken={(value) => { setToken(value) }} /> : null}
                    <Routes>
                        {token.length <= 0 ? <Route path="/" element={<LoginPage token={(value) => { setToken(value); }} />} exact={true} /> : null}
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


