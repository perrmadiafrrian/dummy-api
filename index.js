const express = require("express");
require("dotenv").config();

const app = express();
const port = `${process.env.PORT ?? "8000"}`;

const json = require("./api.json");

app.get("/", (req, res) => {
  res.send("Dummy API Server you can use by just customize the .json file!");
});

app.use((req, res, next) => {
  const url = req.url.substring(1);
  console.log(`URL: ${url}`);
  let result = undefined;
  url.split("/").every((v) => {
    if (!result) {
      const current = json[v];
      if (!current) {
        res.status(404);
        return false;
      }

      result = current;
    } else {
      const current = result[v];
      if (!current) {
        return false;
      }

      result = current;
    }

    return true;
  });
  res.json(result);
});

app.listen(port, () => {
  console.log(`Listening on: localhost:${port}`);
});
