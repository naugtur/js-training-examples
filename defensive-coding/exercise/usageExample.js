// @ts-check
import { makeAuthzManager } from "./authz.js";

const au = makeAuthzManager();

au.setSecrets(["secret1", "secret2"]);

try {
  au.guessSecret("wrong");
} catch (e) {
  console.log("failed to guess the secret", e);
}

au.authorizedFetch([
  {
    url: "https://example.com/one",
    headers: {},
    method: "GET",
  },
  {
    url: "https://example.com/two",
    headers: {},
    method: "GET",
  },
]);
