import React, { createContext, useContext, useEffect, useState } from "react";
import { rest } from "../api";

import { useStore } from "./StoreContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [profileError, setProfileError] = useState(false);

  const [access_token, setAccessToken] = useState(
    localStorage.getItem("@accessToken")
  );
  const [api_key, setApiKey] = useState(localStorage.getItem("@apiKey"));
  const [api_secret, setApiSecret] = useState(
    localStorage.getItem("@apiSecret")
  );
  const [auth_token, setAuthToken] = useState(
    localStorage.getItem("@authToken")
  );

  const [is_loading, setIsLoading] = useState(true);

  const [{ margins }, dispatch] = useStore();

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
        setAuthToken(data.token);
        updateProfile();
        setLogin(true);
        cb();
      })
      .catch((err) => {
        setLoginError(true);
      });
  };

  const userLogout = () => {
    setLogin(false);
    setLoginError(false);
    localStorage.clear();
  };

  const connectZerodha = (requestToken, cb = () => {}) => {
    let data = {
      api_key: api_key,
      request_token: requestToken,
      api_secret: api_secret,
    };

    fetch(`${rest.uri}/zerodha_login/access_token`, {
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

  const updateProfile = () => {
    fetch(rest.profile_detail, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("@authToken")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Profile Error");
        }
      })
      .then((data) => {
        setProfileError(false);
        localStorage.setItem("@apiKey", data.api_key);
        setApiKey(data.api_key);
        localStorage.setItem("@apiSecret", data.api_secret);
        setApiSecret(data.api_secret);

        localStorage.setItem("investment", data.investment);
        localStorage.setItem("nfQuantity", data.nifty_investment);
        localStorage.setItem("bfQuantity", data.banknifty_investment);
        localStorage.setItem("maxProfit", data.max_profit);
        localStorage.setItem("maxLoss", data.max_loss);
      })
      .catch((err) => {
        setProfileError(true);
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
          // retrive the user profile and then update the access token api key etc
          updateProfile();
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

  useEffect(() => {
    console.log(margins);
  }, [margins]);

  const context = {
    login,
    loginError,
    access_token,
    api_key,
    auth_token,
    is_loading,
    profileError,
    userLogin,
    userLogout,
    connectZerodha,
    setAccessToken,
    setApiKey,
    setApiSecret,
    setProfileError,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
