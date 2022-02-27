import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

const StudentsList = (props) => {
  const studentList = useSelector((state) => state.studentsAPI.students);
  const loading = useSelector((state) => state.studentsAPI.fetching);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'API_FETCH_STUDENTS_CALL_REQUEST' });
  }, []);

  return (
    <div>
      <br />
      <h1 align="center"> Students Dashboard </h1>

      {studentList && (
        <table>
          <tr key={'header'}>
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
                    e.preventDefault();

                    dispatch({ type: 'API_DELETE_STUDENT_CALL_REQUEST', id: item._id });
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}

      <div className="loadingIndicator">
        <ClipLoader color={'#26067E'} size={50} loading={loading} />
      </div>
    </div>
  );
};

export default StudentsList;
