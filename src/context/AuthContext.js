import React, { createContext, useContext, useEffect, useState } from "react";
import { rest } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [access_token, setAccessToken] = useState(
    localStorage.getItem("@accessToken")
  );
  const [api_key, setApiKey] = useState(localStorage.getItem("@apiKey"));
  const [api_secret, setApiSecret] = useState(
    localStorage.getItem("@apiSecret")
  );

  const [is_loading, setIsLoading] = useState(true);

  const userLogin = (username, password, cb = () => {}) => {
    fetch(rest.user_login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("login error");
        } else {
          setLoginError(false);
          return res.json();
        }
      })
      .then((data) => {
        localStorage.setItem("@authToken", data.token);
        setLogin(true);
        cb();
      })
      .catch((err) => {
        setLoginError(true);
      });
  };

  const userLogout = () => {
    localStorage.removeItem("@authToken");
    setLogin(false);
    setLoginError(false);
    localStorage.removeItem("@accessToken");
  };

  const connectZerodha = (requestToken, cb = () => {}) => {
    let data = {
      api_key: api_key,
      request_token: requestToken,
      api_secret: api_secret,
    };

    fetch("https://ws.bittrade.space/zerodha_login/access_token", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("@accessToken", data.access_token);
        setAccessToken(data.access_token);
        cb();
      });
  };

  useEffect(() => {
    fetch(rest.is_login, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("@authToken")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setLogin(true);
          setIsLoading(false);
        } else {
          throw new Error("user not logged in");
        }
      })
      .catch((err) => {
        setLogin(false);
        setIsLoading(false);
      });
  }, []);

  const context = {
    login,
    loginError,
    access_token,
    is_loading,
    userLogin,
    userLogout,
    connectZerodha,
    setAccessToken,
    setApiKey,
    setApiSecret,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
