import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentForm from "./StudentForm";

const EditStudentPage = (props) => {

    const { id } = useParams();

    const [student, setStudent] = useState({});

    useEffect(() => {

        fetch("https://mhvd-task-manager.herokuapp.com/users/" + id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then((res) => res.json())
            .then((data) => setStudent(data))
    }, []);


    return (
        <div>
            <StudentForm token={props.token} updateStudent={student} />
        </div>
    )
}

export default EditStudentPage;
