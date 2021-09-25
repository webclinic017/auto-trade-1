import React, { useRef, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { rest } from "../api";

function Settings() {
  const apiKey = useRef();
  const apiSecret = useRef();
  const investment = useRef();
  const nfQuantity = useRef();
  const bfQuantity = useRef();
  const maxProfit = useRef();
  const maxLoss = useRef();

  const history = useHistory();
  const auth = useAuth();

  const updateProfile = () => {
    const body = {
      api_key: apiKey.current.value,
      api_secret: apiSecret.current.value,
      investment: investment.current.value,
      nifty_investment: nfQuantity.current.value,
      banknifty_investment: bfQuantity.current.value,
      max_profit: maxProfit.current.value,
      max_loss: maxLoss.current.value,
    };

    fetch(rest.update_profile, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("@authToken")}`,
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("failed to update profile");
      } else {
        auth.setProfileError(false);
      }
    });
  };

  useEffect(() => {
    apiKey.current.value = localStorage.getItem("@apiKey");
    apiSecret.current.value = localStorage.getItem("@apiSecret");
    investment.current.value = localStorage.getItem("investment");
    nfQuantity.current.value = localStorage.getItem("nfQuantity");
    bfQuantity.current.value = localStorage.getItem("bfQuantity");
    maxProfit.current.value = localStorage.getItem("maxProfit");
    maxLoss.current.value = localStorage.getItem("maxLoss");
  }, []);

  const updateSettings = () => {
    localStorage.setItem("@apiKey", apiKey.current.value);
    localStorage.setItem("@apiSecret", apiSecret.current.value);
    localStorage.setItem("investment", investment.current.value);
    localStorage.setItem("nfQuantity", nfQuantity.current.value);
    localStorage.setItem("bfQuantity", bfQuantity.current.value);
    localStorage.setItem("maxProfit", maxProfit.current.value);
    localStorage.setItem("maxLoss", maxLoss.current.value);

    updateProfile();
    history.goBack();
  };

  return (
    <div className="flex flex-col p-3">
      <label>auto trade key</label>
      <input ref={apiKey} type="password" className="form-input" />

      <label>auto trade secret</label>
      <input ref={apiSecret} type="password" className="form-input" />

      <label>investment</label>
      <input ref={investment} type="number" className="form-input" />

      <label>nifty investment</label>
      <input ref={nfQuantity} type="number" className="form-input" />

      <label>bank nifty investment</label>
      <input ref={bfQuantity} type="number" className="form-input" />

      <label>max profit</label>
      <input ref={maxProfit} type="number" className="form-input" />

      <label>max loss</label>
      <input ref={maxLoss} type="number" className="form-input" />

      <div className="my-2 w-full">
        <Button onClick={updateSettings} variant="contained" color="primary">
          update
        </Button>
      </div>
    </div>
  );
}

export default Settings;
