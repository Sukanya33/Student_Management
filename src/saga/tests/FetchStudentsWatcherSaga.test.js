import { testSaga } from 'redux-saga-test-plan';
import { fetchStudentsWatcherSaga } from './FetchStudentsWatcherSaga';

describe('FetchStudents Saga Testcases', () => {
  const mockToken = 'kdshgsdk';

  test('Should fetch all students and dispatch suceeded action', (done) => {
    const action = {
      type: 'API_FETCH_STUDENTS_CALL_REQUEST',
    };

    const fetchStudentsWorkerSagaa = jest.fun;

    testSaga(fetchStudentsWatcherSaga)
      .next()
      .takeLatest(action, fetchStudentsWorkerSagaa)
      .next()
      .select(mockToken)
      .next()
      .call(fetchStudentsList, mockToken)
      .next({ data: [] })
      .put({ type: 'API_FETCH_STUDENTS_CALL_SUCCESS', students: data })
      .next()
      .isDone();
    done();
  });
});
