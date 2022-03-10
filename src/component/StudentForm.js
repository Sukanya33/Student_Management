import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles/Container.Styled';

const StudentForm = (props) => {
  const [student, setStudent] = useState({});
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.studentsAPI.fetching);
  const create_update_req_success = useSelector(
    (state) => state.studentsAPI.create_update_req_success,
  );

  const navigate = useNavigate();

  useEffect(() => {
    var id = props.updateStudent && props.updateStudent._id ? props.updateStudent._id : '';
    var studentName =
      props.updateStudent && props.updateStudent.name ? props.updateStudent.name : '';
    var studentClass =
      props.updateStudent && props.updateStudent.class ? props.updateStudent.class : '';
    var studentAge = props.updateStudent && props.updateStudent.age ? props.updateStudent.age : '';
    var studentDepartment =
      props.updateStudent && props.updateStudent.department ? props.updateStudent.department : '';
    var studentEmail =
      props.updateStudent && props.updateStudent.email ? props.updateStudent.email : '';
    var studentPassword =
      props.updateStudent && props.updateStudent.password ? props.updateStudent.password : '';
    var studentGender =
      props.updateStudent && props.updateStudent.gender ? props.updateStudent.gender : '';
    var studentLocation =
      props.updateStudent && props.updateStudent.location ? props.updateStudent.location : '';

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
      studentLocation: studentLocation,
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
      minLength: 8,
      minLowerCase: 1,
      minUpperCase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    setStudent({
      ...student,
      studentName: '',
      studentClass: '',
      studentAge: '',
      studentEmail: '',
      studentPassword: '',
      studentGender: '',
      studentLocation: '',
      studentDepartment: '',
    });

    if (props.updateStudent) {
      validPwd = true;
    }

    if (!name || !sclass || !gender || !age || !department || !location) {
      setStudent({
        ...student,
        errorMsg: 'Enter all required fields',
      });
    } else if (!validEmail && !validPwd) {
      setStudent({
        ...student,
        errorMsg: 'Enter valid Email and Valid Password',
      });
    } else if (!validEmail && validPwd) {
      setStudent({
        ...student,
        errorMsg: 'Enter Valid Email',
      });
    } else if (validEmail && !validPwd) {
      setStudent({
        ...student,
        errorMsg:
          'Enter Valid Password it should have special char, lowercase, uppercase and number',
      });
    } else {
      if (props.updateStudent) {
        const updatedStudent = {
          id: student.id,
          name: name,
          class: sclass,
          gender: gender,
          age: age,
          department: department,
          location: location,
        };

        dispatch({ type: 'API_UPDATE_STUDENT_CALL_REQUEST', student: updatedStudent });
      } else {
        const student = {
          name: name,
          email: email,
          password: password,
          class: sclass,
          gender: gender,
          age: age,
          department: department,
          location: location,
        };
        dispatch({ type: 'API_CREATE_STUDENT_CALL_REQUEST', student: student });
      }
    }
  };

  return (
    <div>
      <Container>
        <br />
        <form onSubmit={(e) => e.preventDefault()}>
          <h1> Student Form </h1>

          <div class="col-25">
            <label class="label"> Student Name: </label>
          </div>
          <div class="col-75">
            <input
              id="studentName"
              type="text"
              value={student.studentName}
              onChange={(e) =>
                setStudent({
                  ...student,
                  studentName: e.target.value,
                })
              }
            />
          </div>

          <div class="row">
            <div class="col-25">
              <label class="label"> Student Class: </label>
            </div>
            <div class="col-75">
              <input
                id="studentClass"
                type="text"
                value={student.studentClass}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    studentClass: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {!props.updateStudent ? (
            <div class="row">
              <div class="col-25">
                <label class="label"> Student Email: </label>
              </div>
              <div class="col-75">
                <input
                  id="studentEmail"
                  type="text"
                  value={student.studentEmail}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      studentEmail: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : null}

          {!props.updateStudent ? (
            <div class="row">
              <div class="col-25">
                <label className="label"> Student Password: </label>
              </div>
              <div class="col-75">
                <input
                  id="studentPassword"
                  type="password"
                  value={student.studentPassword}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      studentPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : null}

          <div class="row">
            <div class="col-25">
              <label class="label"> Student Gender: </label>
            </div>
            <div class="col-75">
              <input
                id="studentGender"
                type="text"
                value={student.studentGender}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    studentGender: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label class="label"> Student Age: </label>
            </div>
            <div class="col-75">
              <input
                id="studentAge"
                type="text"
                value={student.studentAge}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    studentAge: e.target.value,
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
              <input
                id="studentDepartment"
                type="text"
                value={student.studentDepartment}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    studentDepartment: e.target.value,
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
              <input
                id="studentLocation"
                type="text"
                value={student.studentLocation}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    studentLocation: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25"></div>
            <div class="col-75">
              <button
                class="button button1"
                onClick={(e) => {
                  e.preventDefault();
                  setStudent({
                    ...student,
                    studentName: '',
                    studentClass: '',
                    studentAge: '',
                    studentEmail: '',
                    studentPassword: '',
                    studentGender: '',
                    studentLocation: '',
                    studentDepartment: '',
                  });
                }}
              >
                {' '}
                RESET{' '}
              </button>

              <button
                class="button button1"
                onClick={(e) => {
                  handleOnSubmit(e, student);
                }}
              >
                {' '}
                SUBMIT{' '}
              </button>
            </div>
          </div>

          <div class="row">
            <div class="col-25"></div>
            <div class="col-75">
              <ClipLoader color={'#26067E'} size={50} loading={loading} />
              {create_update_req_success && navigate('/dashboard')}
              {student.errorMsg && <p className="form__p">{student.errorMsg}</p>}
            </div>
          </div>
        </form>
        {/* {redirect && <Redirect to='/help'/>} */}
      </Container>
    </div>
  );
};

export default StudentForm;
