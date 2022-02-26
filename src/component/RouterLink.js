import React from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";

const RouterLink = (props) => {

    const dispatch = useDispatch();

    return (
        <div>
            <header className="header">
                <h1 className="header__title"> Student Admission</h1> <br /> <br />
               
                        <NavLink className="header__subtitle" to="/dashboard" activeClassName="is-active" > StudentDashboard</NavLink>
                       
                        <NavLink className="header__subtitle" to="/create" activeClassName="is-active" exact={true} > StudentForm</NavLink>
                       
                        <NavLink className="header__subtitle" to="/help" activeClassName="is-active" > HelpPage</NavLink>
                        
                        <input className="button button1 myButton" type="button" name="Logout" value="Logout"
                            onClick={
                                (e) => {
                                    e.preventDefault();
                                    
                                    dispatch({ type: "API_LOGOUT_CALL_REQUEST" });
                                  
                                }
                            }

                        />
                       <br></br>
                       <br></br><br /> <br/>


            </header>
        </div>
    )
}



export default RouterLink;

