import { testSaga } from 'redux-saga-test-plan';
import { loginWatcherSaga } from '../LoginSaga';

describe('Login Saga testcases', () => {
  test('Logging into application using saga', (done) => {
    const action = {
      type: 'API_LOGIN_CALL_REQUEST',
    };

    const loginWorkerSaga = jest.fun;

    testSaga(loginWatcherSaga).next().takeLatest(action, loginWorkerSaga).next().call(fetchLogin),
      email,
      password
        .next(email, password)
        .put({ type: 'API_LOGIN_CALL_SUCCESS', token: token })
        .next()
        .isDone();
    done();
  });
});
