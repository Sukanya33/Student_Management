import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { ClipLoader } from 'react-spinners';

const LoginPage = (props) => {
  const [login, setLogin] = useState({
    email: '',
    passWord: '',
    errorMsg: '',
  });
  const loading = useSelector((state) => state.studentsAPI.fetching);

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    var email = login.email;
    var password = login.passWord;
    var validEmail = validator.isEmail(email);
    var validPwd = password;

    if (!validEmail || !validPwd) {
      setLogin({
        ...login,
        errorMsg: 'Please enter valid Email and Password.',
      });
    } else {
      dispatch({ type: 'API_LOGIN_CALL_REQUEST', login_email: email, login_password: password });
    }
  };

  return (
    <div>
      <div className="header">
        <h1 className="header__title"> Student Management </h1>
      </div>
      <div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <table align="center">
            <tr>
              <td>
                <label class="label">Email: </label>
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={login.email}
                  onChange={(e) => {
                    setLogin({
                      ...login,
                      email: e.target.value,
                      errorMsg: '',
                    });
                  }}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label class="label">Password: </label>
              </td>
              <td>
                {' '}
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={login.passWord}
                  onChange={(e) => {
                    setLogin({
                      ...login,
                      passWord: e.target.value,
                      errorMsg: '',
                    });
                  }}
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <input
                  type="reset"
                  name="reset"
                  value="RESET"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    setLogin({
                      email: '',
                      passWord: '',
                      errorMsg: '',
                    });
                  }}
                />
                <input
                  type="submit"
                  name="submit"
                  value="SIGNIN"
                  onClick={(e) => {
                    handleOnSubmit(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <div className="loginPage_loadingIndicator">
                <ClipLoader color={'#26067E'} size={50} loading={loading} />
              </div>
              <td> {login.errorMsg && <p className="form__p">{login.errorMsg}</p>}</td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
