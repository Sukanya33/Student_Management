import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const StudentDetails = (props) => {

    const [studentList, setStudentList] = useState([]);
    // const navigate = useNavigate();
    const token = props.token;

    useEffect(() => {
        fetch("https://mhvd-task-manager.herokuapp.com/users/all", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        )
            .then((res) => res.json())
            .then((data) => setStudentList(data))
    }, []);


   
    return (

        <div >
            <br />
            <h1 align="center"> Students Dashboard </h1>
          
            {studentList.length > 0 && 
                <table>
                <tr key={"header"}>
                            <td className="header__subtitle">Name</td>
                            <td className="header__subtitle">Email</td>
                            <td className="header__subtitle">Age</td>
                            <td className="header__subtitle">Gender</td>
                            <td className="header__subtitle">Class</td>
                            <td className="header__subtitle">Departement</td>
                            <td className="header__subtitle">Location</td>
                            <td className="header__subtitle">Update</td>
                            <td className="header__subtitle">Remove</td>
                </tr>
                
                {studentList.map((item) => (
                        <tr key={item._id}>
                            <td align="center">{item.name}</td>
                            <td align="center">{item.email}</td>
                            <td align="center">{item.age}</td>
                            <td align="center">{item.gender}</td>
                            <td align="center">{item.class}</td>
                            <td align="center">{item.department}</td>
                            <td align="center">{item.location}</td>
                            <td align="center">
                                <Link to={`/edit/${item._id}`}> Update </Link>
                            </td>
                            <td align="center">
                            <button
                        onClick={(e) => {
                            fetch("https://mhvd-task-manager.herokuapp.com/users/" + item._id, {
                                method: "DELETE",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + props.token
                                }
                            })
                                .then((res) => {
                                    if (res.status === 200) {
                                        const tempArray = studentList.filter((student) => student._id !== item._id)
                                       
                                        setStudentList(tempArray)
                                    }
                                })
                        }}
                    > Remove </button>        
                            </td>
                    </tr>
                )
                )}
            </table>
            }
        </div>

    )
}

export default StudentDetails;

