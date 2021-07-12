import React, { useState, useRef } from "react";
import { BellIcon, LogoutIcon, SettingIcon } from "./icons";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { IconButton } from "@material-ui/core";

import { useHistory } from "react-router-dom";

function Header({ setAccessToken, authToken, setAuthToken }) {
  const history = useHistory();
  const [popup, setPopup] = useState(false);
  const requestToken = useRef();

  const logoutUser = () => {
    localStorage.removeItem("@accessToken");
    setAccessToken(null);
    localStorage.removeItem("@authToken");
    setAuthToken(null);
  };

  const connectZerodha = () => {
    let data = {
      api_key: localStorage.getItem("@apiKey"),
      request_token: requestToken.current.value,
      api_secret: localStorage.getItem("@apiSecret"),
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
        setPopup(false);
      });
  };

  return (
    <div className="p-3 shadow-md flex flex-row items-center sticky z-50 top-0 bg-white">
      <div className="flex items-center">
        <IconButton className="mr-2" onClick={() => history.replace("/")}>
          <ShowChartIcon className="h-6 w-6" />
        </IconButton>

        <strong className="font-serif">Auto Trade</strong>
      </div>

      {authToken !== null ? (
        <div className="flex-1 flex flex-row justify-end items-center">
          <IconButton className="mx-1 md:block">
            <BellIcon className="h-6 w-6" />
          </IconButton>

          <IconButton onClick={logoutUser} className="mx-1 md:block">
            <LogoutIcon className="h-6 w-6" />
          </IconButton>

          <IconButton
            onClick={() => history.push("/settings")}
            className="mx-1 md:block"
          >
            <SettingIcon className="h-6 w-6" />
          </IconButton>

          <IconButton
            onClick={() => {
              setPopup(true);
              localStorage.removeItem("@accessToken");
              setAccessToken(null);
              window.open(
                `https://kite.zerodha.com/connect/login?api_key=${localStorage.getItem(
                  "@apiKey"
                )}`,
                "zerodha",
                "height=500,width=650,top=100,left=400"
              );
            }}
            className="mx-1 md:block"
          >
            <LabelImportantIcon className="h-6 w-6 text-red-600" />
          </IconButton>
        </div>
      ) : null}

      {popup ? (
        <div className="w-screen h-screen  absolute top-0 right-0 bg-opacity-50 bg-gray-500 flex flex-col justify-center items-center">
          <div className="bg-white z-50 p-2 rounded-lg flex flex-col items-center justify-center">
            <div className="grid grid-cols-5 gap-1">
              <input
                type="text"
                className="border-gray-300 col-span-3"
                placeholder="request token"
                ref={requestToken}
              />
              <button
                onClick={connectZerodha}
                className="bg-blue-500 text-white font-bold"
              >
                connect
              </button>
              <button
                onClick={() => setPopup(false)}
                className="bg-red-500 text-white font-bold"
              >
                close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
