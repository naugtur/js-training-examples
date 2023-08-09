// @ts-check
import { makeAuthzManager } from "./authz.js";
import assert from "assert";
import http from "http";

const au = makeAuthzManager();

au.setSecrets(["secret1", "secret2"]);

const server = http.createServer((req, res) => {
  res.end(req.headers.authorization);
});
server.listen(1234, async () => {
  try {
    assert.throws(() => au.guessSecret("wrong"));
    assert.doesNotThrow(() => au.guessSecret("secret1"));

    await au
      .authorizedFetch([
        {
          url: "http://localhost:1234/one",
          headers: {},
          method: "GET",
        },
        {
          url: "http://localhost:1234/two",
          headers: {},
          method: "GET",
        },
      ])
      .then((results) => Promise.all(results.map((re) => re.text())))
      .then(([result1, result2]) => {
        assert.equal(
          result1,
          "Bearer secret1",
          "Expected an authorization header with a matching secret"
        );
        assert.equal(
          result2,
          "Bearer secret2",
          "Expected an authorization header with a matching secret"
        );
      });

    console.error("[ TEST PASSED ]");
    process.exit(0);
  } catch (e) {
    console.error(e);
    console.error("[ TEST FAILED ]");
    process.exit(1);
  }
});
