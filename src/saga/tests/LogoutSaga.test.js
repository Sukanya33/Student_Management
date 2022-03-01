import { testSaga } from 'redux-saga-test-plan';
import { logoutWatcherSaga } from '../LogoutSaga';

describe('Testcases for Logout Component', () => {
  const mockToken = 'kdshgsdk';

  test('Logout from the application', (done) => {
    const action = {
      type: 'API_LOGOUT_CALL_REQUEST',
    };

    const logoutWorkerSaga = jest.fun;

    testSaga(logoutWatcherSaga)
      .next()
      .takeLatest(action, logoutWorkerSaga)
      .next()
      .select(mockToken)
      .next()
      .call(performLogout, mockToken)
      .next()
      .put({ type: 'API_CREATE_STUDENT_CALL_SUCCESS' })
      .next()
      .isDone();
    done();
  });
});
