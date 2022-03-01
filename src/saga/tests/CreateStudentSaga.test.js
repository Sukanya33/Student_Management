import { testSaga } from 'redux-saga-test-plan';
import { createStudentWatcherSaga } from '../CreateStudentSaga';

describe('CreateStudent Saga testcases', () => {
  const mockToken = 'kdshgsdk';

  test('Should fetch all students and dispatch suceeded action', (done) => {
    const action = {
      type: 'API_CREATE_STUDENT_CALL_REQUEST',
    };

    const createStudentWorkerSaga = jest.fun;

    testSaga(createStudentWatcherSaga)
      .next()
      .takeLatest(action, createStudentWorkerSaga)
      .next()
      .select(mockToken)
      .next()
      .call(createStudent, mockToken)
      .next({ data: [] })
      .put({ type: 'API_CREATE_STUDENT_CALL_SUCCESS', students: data })
      .next()
      .isDone();
    done();
  });
});
