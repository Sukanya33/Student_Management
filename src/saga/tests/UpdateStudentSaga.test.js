import { testSaga } from 'redux-saga-test-plan';
import { updateStudentWatcherSaga } from '../UpdateStudentSaga';

describe('Testcases for Update Student Saga Component', () => {
  const mockToken = 'kdshgsdk';

  test('Should update the student details', (done) => {
    const action = {
      type: 'API_UPDATE_STUDENT_CALL_REQUEST',
    };

    const updateStudentWorkerSaga = jest.fun;

    testSaga(updateStudentWatcherSaga)
      .next()
      .takeLatest(action, updateStudentWorkerSaga)
      .next()
      .select(mockToken)
      .next()
      .call(updateStudentDetails, mockToken)
      .next({ data: {} })
      .put({ type: 'API_UPDATE_STUDENT_CALL_SUCCESS', students: data })
      .next()
      .isDone();
    done();
  });
});
