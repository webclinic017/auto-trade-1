import React from "react";
import { Button } from "@material-ui/core";

function Settings() {
  return (
    <form className="flex flex-col p-3">
      <label>api key</label>
      <input type="text" className="form-input" />

      <label>api secret</label>
      <input type="text" className="form-input" />

      <label>investment</label>
      <input type="number" className="form-input" />

      <label>nf quantity</label>
      <input type="number" className="form-input" />

      <label>bf quantity</label>
      <input type="number" className="form-input" />

      <div className="my-2 w-full">
        <Button type="submit" variant="contained" color="primary">
          update
        </Button>
      </div>
    </form>
  );
}

export default Settings;
