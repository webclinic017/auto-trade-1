import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";

function Login({ setAuthToken }) {
  const userName = useRef();
  const passWord = useRef();

  const { userLogin, loginError } = useAuth();

  const loginUser = () => {
    userLogin(userName.current.value, passWord.current.value, () => {
      userName.current.value = "";
      passWord.current.value = "";
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col p-3 items-center justify-center">
        {loginError ? (
          <strong className="font-sans text-red-700">
            error occured while login
          </strong>
        ) : null}
        <strong className="text-3xl md:text-xl font-serif text-blue-400 my-2">
          Login
        </strong>
        <input
          ref={userName}
          type="text"
          placeholder="username"
          className="form-input md:w-80"
        />
        <input
          ref={passWord}
          type="password"
          placeholder="password"
          className="form-input md:w-80"
        />
        <button
          onClick={loginUser}
          className="bg-blue-500 my-2 shadow w-20 p-1 text-white font-bold md:w-36 md:p-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
