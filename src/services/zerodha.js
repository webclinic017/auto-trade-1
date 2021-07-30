export const make_order_request = (
  data,
  cb,
  errHandler = (e) => {
    console.log(e);
  }
) => {
  fetch(data["endpoint"], {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Token ${data.token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("there is an error");
      } else {
        return res.json();
      }
    })
    .then(() => {
      cb();
    })
    .catch((err) => errHandler(err));
};
