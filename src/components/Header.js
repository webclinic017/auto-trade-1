import React from "react";
import { BellIcon, LogoutIcon, BarChartIcon, SettingIcon } from "./icons";
import { IconButton } from "@material-ui/core";

function Header() {
  return (
    <div className="p-3 shadow-md flex flex-row items-center">
      <div className="flex">
        <BarChartIcon className="mr-2 h-6 w-6" />
        <strong>Auto Trade</strong>
      </div>

      <div className="flex flex-row justify-center items-center flex-1">
        <input
          placeholder="search"
          className="bg-gray-200 rounded-lg outline-none p-2 w-1/2 hidden md:block"
        />
      </div>
      <div className="flex flex-row justify-end items-center">
        <IconButton className="mx-2 md:block">
          <BellIcon className="h-6 w-6" />
        </IconButton>

        <IconButton className="mx-2 md:block">
          <LogoutIcon className="h-6 w-6" />
        </IconButton>

        <IconButton className="mx-2 md:block">
          <SettingIcon className="h-6 w-6" />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
