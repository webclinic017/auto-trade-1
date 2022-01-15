import { LogoutIcon, SettingIcon } from "../icons";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useHeader } from "./Header.hooks";

function Header() {
  const history = useHistory();
  const { openZerodhaLogin, isPopupOpen, closePopup } = useHeader();
  const auth = useAuth();

  return (
    <div className="p-3 shadow-md flex flex-row items-center sticky z-50 top-0 bg-white">
      <div className="flex items-center">
        <IconButton className="mr-2" onClick={() => history.replace("/")}>
          <ShowChartIcon className="h-6 w-6" />
        </IconButton>

        <strong className="font-serif">Bit Trade</strong>
      </div>

      {auth.isAuthenticated && (
        <div className="flex-1 flex flex-row justify-end items-center">
          <IconButton onClick={auth.logoutUser} className="mx-1 md:block">
            <LogoutIcon className="h-6 w-6" />
          </IconButton>

          <IconButton
            onClick={() => history.push("/settings")}
            className="mx-1 md:block"
          >
            <SettingIcon className="h-6 w-6" />
          </IconButton>

          <IconButton onClick={openZerodhaLogin} className="mx-1 md:block">
            <LabelImportantIcon className="h-6 w-6 text-red-600" />
          </IconButton>
        </div>
      )}

      {isPopupOpen && (
        <div className="w-screen h-screen  absolute top-0 right-0 bg-opacity-50 bg-gray-500 flex flex-col justify-center items-center">
          <div className="z-50 rounded-lg flex flex-col items-center justify-center">
            <h1 className="font-bold text-xl text-white my-3">
              connecting ......
            </h1>
            <button
              onClick={closePopup}
              className="bg-red-500 px-4 py-2 rounded text-white font-bold"
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
