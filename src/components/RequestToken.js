import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function RequestToken() {
  const { requestToken } = useParams();

  useEffect(() => {
    localStorage.setItem("@requestToken", requestToken);

    const interval = setTimeout(() => {
      window.close();
      window.top.close();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [requestToken]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <LoadingScreen />
    </div>
  );
}

export default RequestToken;
