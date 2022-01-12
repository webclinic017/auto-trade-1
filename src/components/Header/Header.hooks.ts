import { useState } from "react";
import { useConnectZerodha } from "../../api/auth/connectZerodha";
import { useGetZerodhaLoginUrl } from "../../api/auth/getZerodhaLoginUrl";
import { LocalStorage } from "../../entities/localstorage";

interface UseHeaderHooks {
  isPopupOpen: boolean;
  openZerodhaLogin: () => void;
  closePopup: () => void;
}

export const useHeader = (): UseHeaderHooks => {
  const { data: zerodhaLoginData } = useGetZerodhaLoginUrl();
  const { mutateAsync: connectZerodha } = useConnectZerodha();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const removeTokenListener = () => {
    window.removeEventListener("storage", () => {});
  };

  const listenForReqToken = () => {
    LocalStorage.clearRequestToken();

    window.addEventListener("storage", async () => {
      if (LocalStorage.requestToken !== "") {
        await connectZerodha({
          request_token: LocalStorage.requestToken,
        });

        setIsPopupOpen(false);

        removeTokenListener();
        LocalStorage.clearRequestToken();
      }
    });
  };

  const openZerodhaLogin = () => {
    setIsPopupOpen(true);

    listenForReqToken();

    window.open(
      zerodhaLoginData?.login_url ?? "",
      "zerodha",
      "height=500,width=650,top=100,left=400"
    );
  };

  const closePopup = () => {
    removeTokenListener();
    setIsPopupOpen(false);
  };

  return {
    isPopupOpen,
    openZerodhaLogin,
    closePopup,
  };
};
