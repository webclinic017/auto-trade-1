import React, { useState } from "react";
import { BellIcon, LogoutIcon, SettingIcon } from "./icons";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { IconButton } from "@material-ui/core";

import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const [popup, setPopup] = useState(false);

  return (
    <div className="p-3 shadow-md flex flex-row items-center sticky z-50 top-0 bg-white">
      <div className="flex items-center">
        <IconButton className="mr-2" onClick={() => history.replace("/")}>
          <ShowChartIcon className="h-6 w-6" />
        </IconButton>

        <strong className="hidden md:block">Auto Trade</strong>
      </div>

      <div className="flex flex-row justify-center items-center flex-1">
        <input
          placeholder="search"
          className="bg-gray-200 rounded-lg outline-none p-2 w-1/2 hidden md:block"
        />
      </div>
      <div className="flex flex-row justify-end items-center">
        <IconButton className="mx-1 md:block">
          <BellIcon className="h-6 w-6" />
        </IconButton>

        <IconButton className="mx-1 md:block">
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
            window.open(
              "https://kite.zerodha.com/connect/login",
              "zerodha",
              "height=500,width=650,top=100,left=400"
            );
          }}
          className="mx-1 md:block"
        >
          <LabelImportantIcon className="h-6 w-6 text-red-600" />
        </IconButton>
      </div>

      {popup ? (
        <div className="w-screen h-screen  absolute top-0 right-0 bg-opacity-50 bg-gray-500 flex flex-col justify-center items-center">
          <div className="bg-white z-50 p-2 rounded-lg flex flex-col items-center justify-center">
            <div className="grid grid-cols-5 gap-1">
              <input
                type="text"
                className="border-gray-300 col-span-3"
                placeholder="request token"
              />
              <button className="bg-blue-500 text-white font-bold">
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
