import { useParams } from 'react-router-dom';
import StudentForm from './StudentForm';
import { useSelector } from 'react-redux';

const EditStudentPage = (props) => {
  const { id } = useParams();

  const student = useSelector((state) =>
    state.studentsAPI.students.find((student) => student._id === id),
  );

  return (
    <div>
      <StudentForm token={props.token} updateStudent={student} />
    </div>
  );
};

export default EditStudentPage;
