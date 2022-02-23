import React, { useState } from "react";
import validator from "validator";



const LoginPage = (props) => {

    const [login, setLogin] = useState({
        email: "",
        passWord: "",
        errorMsg: ""
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
       
        var email = login.email;
        var password = login.passWord;
        var validEmail = validator.isEmail(email);
        var validPwd = password;

        
        if (!validEmail || !validPwd) {
           
            setLogin({
                ...login,
                errorMsg: "Please enter valid Email and Password."
            })
        }
       
        else {
            fetch("https://mhvd-task-manager.herokuapp.com/users/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { email: login.email, password: login.passWord }
                )
            })
                .then((res) => {
                    if (res.status === 200)
                        return res.json();
                    else
                        setLogin({
                            ...login,
                            errorMsg: "Invalid credentials entered."
                        });
                })
                .then((data) => {
                    
                    if (data.token)
                        props.token(data.token);
                })
        }
    }

    return (


        <div >
            <div className="header">
                <h1 className="header__title"> Student Management </h1>
            </div>
            <div>
                <form className="form">
                    <table align="center">
                        <tr><td>
                            <label class="label" >Email: </label>
                        </td>
                            <td>                           
                                <input type="email"
                                    name="email"
                                    id="email"
                                    value={login.email}
                                    onChange={(e) => {
                                        setLogin({
                                            ...login,
                                            email: e.target.value
                                        })
                                    }
                                    }
                                />
                            </td></tr>

                        <tr>
                            <td>
                                <label class="label" >Password: </label>
                            </td>
                            <td> <input type="password"
                                name="password"
                                id="password"
                                value={login.passWord}
                                onChange={(e) => {
                                    setLogin({
                                        ...login,
                                        passWord: e.target.value
                                    })
                                }
                                } />
                            </td></tr>

                        <tr><td></td>
                            <td>
                                <input type="reset"
                                    name="reset"
                                    value="RESET"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("email").value = "";
                                        document.getElementById("password").value = "";
                                        setLogin({
                                            email: "",
                                            passWord: "",
                                            errorMsg: ""
                                        })
                                    }}
                                />
                                <input type="submit"
                                    name="submit"
                                    value="SIGNIN"
                                    onClick={(e) => { handleOnSubmit(e) }}
                                />
                            </td></tr>
                            <tr><td></td>
                                <td> {login.errorMsg && <p className="form__p">{login.errorMsg}</p>}</td>
                            </tr>
                    </table>               
               </form>
            </div>
        </div>
    )
}
export default LoginPage;