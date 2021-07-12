import React, { useRef } from "react";
import { rest } from "../api";

function Login({ setAuthToken }) {
  const userName = useRef();
  const passWord = useRef();

  const loginUser = () => {
    fetch(rest.user_login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName.current.value,
        password: passWord.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        userName.current.value = "";
        passWord.current.value = "";
        localStorage.setItem("@authToken", data.token);
        setAuthToken(data.token);
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col p-3 items-center justify-center">
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
