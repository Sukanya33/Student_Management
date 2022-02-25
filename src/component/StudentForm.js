import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";


const StudentForm = (props) => {

  const [student, setStudent] = useState({});
  const dispatch = useDispatch();


  useEffect(() => {
    var id = (props.updateStudent && props.updateStudent._id) ? props.updateStudent._id : "";
    var studentName = (props.updateStudent && props.updateStudent.name) ? props.updateStudent.name : "";
    var studentClass = (props.updateStudent && props.updateStudent.class) ? props.updateStudent.class : "";
    var studentAge = (props.updateStudent && props.updateStudent.age) ? props.updateStudent.age : "";
    var studentDepartment = (props.updateStudent && props.updateStudent.department) ? props.updateStudent.department : "";
    var studentEmail = (props.updateStudent && props.updateStudent.email) ? props.updateStudent.email : "";
    var studentPassword = (props.updateStudent && props.updateStudent.password) ? props.updateStudent.password : "";
    var studentGender = (props.updateStudent && props.updateStudent.gender) ? props.updateStudent.gender : "";
    var studentLocation = (props.updateStudent && props.updateStudent.location) ? props.updateStudent.location : "";

    
    setStudent({
      ...student,
      id: id,
      studentName: studentName,
      studentClass: studentClass,
      studentEmail: studentEmail,
      studentPassword: studentPassword,
      studentGender: studentGender,
      studentAge: studentAge,
      studentDepartment: studentDepartment,
      studentLocation: studentLocation

    });
  }, [props.updateStudent]);


  const handleOnSubmit = (e, student) => {

    e.preventDefault();
  
    var url, method, headers, body;
    var email = student.studentEmail;
    var password = student.studentPassword;
    var validEmail = validator.isEmail(email);
    var name = student.studentName;
    var sclass = student.studentClass;
    var gender = student.studentGender;
    var age = student.studentAge;
    var department = student.studentDepartment;
    var location = student.studentLocation;
    var validPwd = validator.isStrongPassword(password, {
      minLength: 8, minLowerCase: 1, minUpperCase: 1,
      minNumbers: 1, minSymbols: 1
    });

    if (props.updateStudent) {
      validPwd = true;
    }

    if (!name || !sclass || !gender || !age || !department || !location) {
      
      setStudent({
        ...student,
        errorMsg: "Enter all required fields"
      })

    }

    else if (!validEmail && !validPwd) {
     
      setStudent({
        ...student,
        errorMsg: "Enter valid Email and Valid Password"
      })
    }
    else if (!validEmail && validPwd) {
      setStudent({
        ...student,
        errorMsg: "Enter Valid Email"
      })
    }
    else if (validEmail && !validPwd) {
      setStudent({
        ...student,
        errorMsg: "Enter Valid Password it should have special char, lowercase, uppercase and number"
      })
    }
    else {
      // fetch method

      if (props.updateStudent) {

        dispatch({ type: "API_UPDATE_STUDENT_CALL_REQUEST", id: student.id, name: name, class: sclass, gender: gender, age: age, department: department, location: location})

        //update student details with server
        // url = "https://mhvd-task-manager.herokuapp.com/users/" + student.id
        // method = "PATCH"
        // headers = {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        //   'Authorization': 'Bearer ' + props.token
        // }
        // body = JSON.stringify({
        //   name: student.studentName,
        //   class: student.studentClass,
        //   gender: student.studentGender,
        //   age: student.studentAge,
        //   department: student.studentDepartment,
        //   location: student.studentLocation,
        // })
      } else {
        // create student with server
        url = "https://mhvd-task-manager.herokuapp.com/users"
        method = "POST"
        headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        body = JSON.stringify({
          // id: student.id,
          name: student.studentName,
          class: student.studentClass,
          email: student.studentEmail,
          password: student.studentPassword,
          gender: student.studentGender,
          age: student.studentAge,
          department: student.studentDepartment,
          location: student.studentLocation,
        });
      }
      fetch(url, {
        method,
        headers,
        body: body
      })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            //do further if required
            // setRedirect(true);
            //<Redirect to="/dashboard" />
            //history.push("/dashboard")
          document.getElementById("studentClass").value = "";
          document.getElementById("studentName").value = "";
          document.getElementById("studentEmail").value = "";
          document.getElementById("studentGender").value = "";
          document.getElementById("studentAge").value = "";
          document.getElementById("studentDepartment").value = "";
          document.getElementById("studentLocation").value = "";
          document.getElementById("studentPassword").value = "";
          }
        })
    }
  };

  

  return (
    <div className="container"> <br />
      <form onSubmit={(e) => handleOnSubmit(e, student)}>
        
          <h1 > Student Form </h1>
         
          <div class="col-25">
          <label class="label"> Student Name: </label>
          </div>
          <div class="col-75">
          <input id="studentName" type="text"
            value={student.studentName}
            onChange={(e) => setStudent({
              ...student,
              studentName: e.target.value
            })
            }
          />
        </div>

        <div class="row">
        <div class="col-25">
          <label class="label"> Student Class: </label>
          </div>
          <div class="col-75">
          <input id="studentClass" type="text"
            value={student.studentClass}
            onChange={(e) => setStudent({
              ...student,
              studentClass: e.target.value
            })
            }
          />
          </div>
        </div>
        {!props.updateStudent ?
          <div class="row">
          <div class="col-25">
            <label class="label"> Student Email: </label>
            </div>
            <div class="col-75">
            <input id="studentEmail" type="text"
              value={student.studentEmail}
              onChange={(e) => setStudent({
                ...student,
                studentEmail: e.target.value
              })
              }
            />
            </div>
          </div>
          : null}

        {!props.updateStudent ?
          <div class="row">
          <div class="col-25">
          <label className="label"> Student Password: </label>
          </div>
          <div class="col-75">
            <input id="studentPassword" type="password"
              value={student.studentPassword}
              onChange={(e) => setStudent({
                ...student,
                studentPassword: e.target.value
              })
              }
            />
            </div>
          </div>
          : null}

        <div class="row">
        <div class="col-25">
          <label class="label"> Student Gender: </label> </div>
          <div class="col-75">
          <input id="studentGender" type="text"
            value={student.studentGender}
            onChange={(e) => setStudent({
              ...student,
              studentGender: e.target.value
            })
            }
          />
          </div>
        </div>

        <div class="row">
        <div class="col-25">
          <label class="label"> Student Age: </label> </div>
          <div class="col-75">
          <input id="studentAge" type="text"
            value={student.studentAge}
            onChange={(e) => setStudent({
              ...student,
              studentAge: e.target.value
            })
            }
          />
        </div>
        </div>

        <div class="row">
        <div class="col-25">
          <label class="label"> Student Department: </label>
          </div>
          <div class="col-75">
          <input id="studentDepartment" type="text"
            value={student.studentDepartment}
            onChange={(e) => setStudent({
              ...student,
              studentDepartment: e.target.value
            })
            }
          />
        </div>
        </div>

        <div class="row">
        <div class="col-25">
          <label class="label"> Student Location: </label>
          </div>
           <div class="col-75">
          <input id="studentLocation" type="text"
            value={student.studentLocation}
            onChange={(e) => setStudent({
              ...student,
              studentLocation: e.target.value
            })
            }
          />
        </div>
        </div>

       <div class="row">
       <div class="col-25"></div>
        <div class="col-75">
        <button class="button button1" onClick={(e) => {
          e.preventDefault();
          document.getElementById("studentClass").value = "";
          document.getElementById("studentName").value = "";
          document.getElementById("studentEmail").value = "";
          document.getElementById("studentGender").value = "";
          document.getElementById("studentAge").value = "";
          document.getElementById("studentDepartment").value = "";
          document.getElementById("studentLocation").value = "";
          document.getElementById("studentPassword").value = "";
        }} > RESET </button>

<button class="button button1" onClick={(e) => { }
        }
        > SUBMIT </button>
        </div>
        </div>

        <div class="row">
       <div class="col-25"></div>
        <div class="col-75">
        {student.errorMsg && <p className="form__p">{student.errorMsg}</p>}
        </div>
        </div>
      </form>

      {/* {redirect && <Redirect to='/help'/>} */}
      

    </div>
  )
};


export default StudentForm;
