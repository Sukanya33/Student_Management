import { testSaga } from 'redux-saga-test-plan';
import { deleteStudentWatcherSaga } from '../DeleteStudentSaga';

describe('DeleteStudent Saga testcases', () => {
  const mockToken = 'kdshgsdk';

  test('Delete the student which is user required and dispatch suceeded action', (done) => {
    const action = {
      type: 'API_DELETE_STUDENT_CALL_REQUEST',
    };

    const deleteStudentWorkerSaga = jest.fun;

    testSaga(deleteStudentWatcherSaga)
      .next()
      .takeLatest(action, deleteStudentWorkerSaga)
      .next()
      .select(mockToken)
      .next()
      .call(createStudent, mockToken)
      .next({ id: '' })
      .put({ type: 'API_DELETE_STUDENT_CALL_SUCCESS', id: id })
      .next()
      .isDone();
    done();
  });
});
