import React, { useRef, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Settings() {
  const apiKey = useRef();
  const apiSecret = useRef();
  const investment = useRef();
  const nfQuantity = useRef();
  const bfQuantity = useRef();

  const history = useHistory();

  useEffect(() => {
    apiKey.current.value = localStorage.getItem("@apiKey");
    apiSecret.current.value = localStorage.getItem("@apiSecret");
    investment.current.value = localStorage.getItem("investment");
    nfQuantity.current.value = localStorage.getItem("nfQuantity");
    bfQuantity.current.value = localStorage.getItem("bfQuantity");
  }, []);

  const updateSettings = () => {
    localStorage.setItem("@apiKey", apiKey.current.value);
    localStorage.setItem("@apiSecret", apiSecret.current.value);
    localStorage.setItem("investment", investment.current.value);
    localStorage.setItem("nfQuantity", nfQuantity.current.value);
    localStorage.setItem("bfQuantity", bfQuantity.current.value);
    history.goBack();
  };

  return (
    <div className="flex flex-col p-3">
      <label>api key</label>
      <input ref={apiKey} type="text" className="form-input" />

      <label>api secret</label>
      <input ref={apiSecret} type="text" className="form-input" />

      <label>investment</label>
      <input ref={investment} type="number" className="form-input" />

      <label>nf quantity</label>
      <input ref={nfQuantity} type="number" className="form-input" />

      <label>bf quantity</label>
      <input ref={bfQuantity} type="number" className="form-input" />

      <div className="my-2 w-full">
        <Button onClick={updateSettings} variant="contained" color="primary">
          update
        </Button>
      </div>
    </div>
  );
}

export default Settings;
