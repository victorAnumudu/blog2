const express = require("express");
const path = require("path");

const app = express(),
  port = process.env.PORT || 3002;

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, (_) => console.log("Server running on port", port));
