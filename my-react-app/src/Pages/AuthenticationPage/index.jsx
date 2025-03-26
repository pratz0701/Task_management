/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { API_URLS } from "../../CRUDoperations/constants";
import useCrudOperations from "../../useHooks/useCrudOperations";
import { getSanitizedInput } from "../../Utils/utils";
import { Navigate } from "react-router-dom";
import { UiRoutes } from "../../Constants/constants";
import { storeTokens } from "../../Storage/setCookies";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [authentication,loadingAuthentication,errorAuthentication, getAuthentication] = useCrudOperations({
    method: 'POST',
    url: API_URLS.login,
    skipAccessToken:true
  });
  
  useEffect(()=>{
    if(authentication){
      storeTokens({accessToken:authentication.accessToken,refreshToken:authentication.refreshToken})
    }
  },[authentication])

  const handleLoginSubmitEvent = (e) => {
    e.preventDefault();
    if ( input.username!=='' && input.password !== "") {
      getAuthentication({
        requestData:{
          username:input.username,
          password:input.password
        }
      })
    }
  };

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: getSanitizedInput(value,'authentication'),
    }));
  };

  return (
    <>
    {authentication && <Navigate to='/'/>}
    <form onSubmit={handleLoginSubmitEvent}>
      <div className="form_control">
        <label htmlFor="username">Username:</label>
        <input
          type="username"
          id="username"
          name="username"
          aria-describedby="user-name"
          aria-invalid="false"
          onChange={handleLoginInput}
        />
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleLoginInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
    </>
  );
};

export default Login;