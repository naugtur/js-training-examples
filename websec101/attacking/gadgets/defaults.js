import express from "express";
const app = express();

const production = process.env.NODE_ENV !== "development";

app.get("/", (req, res) => {
  // Set a simple cookie
  const cookieOptions = {};
  if (production) {
    cookieOptions.httpOnly = true;
    cookieOptions.secure = true;
  }

  res.cookie("testCookie", "thisIsATest", cookieOptions);
  res.send("Cookie has been set");
});

app.listen(1111, () => console.log("Server running on port 1111"));







// at any point, really
setTimeout(() => {
  Object.defineProperty(Object.prototype, "sameSite", {
    get() {
      return "None";
    },
  });
  Object.defineProperty(Object.prototype, "httpOnly", {
    set() {},
    get() {
      return false;
    },
  });
  Object.defineProperty(Object.prototype, "secure", {
    set() {},
    get() {
      return false;
    },
  });
}, 1000);
