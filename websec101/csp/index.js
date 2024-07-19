const express = require("express");
const { headers } = require("./headers.json");
const app = express();

const stealingEnabled = process.argv.includes("steal");

app.post("/report", (req, res) => {
  req.on("end", () => res.end("ok")).pipe(process.stdout);
});

app.use((req, res, next) => {
  Object.entries(headers).forEach((header) => {
    res.setHeader(header[0], header[1]);
  });

  if(req.path === "/evil.js" && !stealingEnabled) {
    return res.status(404).end("Not found");
  }
  next();
});
// public static site
app.use("/", express.static("public"));

// Have to choose some port, right
app.listen(1337);

console.log("Open http://localhost:1337/");
