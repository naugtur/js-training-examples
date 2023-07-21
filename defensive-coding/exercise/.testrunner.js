const attackNumber = process.argv[2];
if (!attackNumber) {
  console.error(
    "Oops. You need one more argument - the number of the attack you want to test\n"
  );
  process.exit(1);
}
const { random } = Math;
const { log } = console;
const { stringify } = JSON;

const secret1 = "secret" + random().toFixed(6).substring(2);
const secret2 = "secret" + random().toFixed(6).substring(2);
const check1 = RegExp.prototype.test.bind(RegExp(secret1));
const check2 = RegExp.prototype.test.bind(RegExp(secret2));

import { makeAuthzManager } from "./authz.js";

async function run() {
  let attacker;
  try {
    attacker = await import(`./attacks/attack${attackNumber}.js`);
  } catch (e) {
    console.error(
      `Failed to run 'attack${attackNumber}.js' - are you sure it exists in the ./attacks/ folder? Is it valid JavaScript?
      Error details: 
      ${e.message}`
    );
    process.exit(1);
  }

  const au = makeAuthzManager();

  au.setSecrets([secret1, secret2]);
  let success = false;
  process.on("exit", (code) => {
    if (!success) {
      log("🎉 Attack was not triggered!");
    }
  });
  attacker.attack(au, (stolenGoods) => {
    success = true;
    log("💣 Attack triggered!");
    const payload = stringify(stolenGoods);
    if (check1(payload) || check2(payload)) {
      log("🤯 Secrets leaked!");
    } else {
      log(
        "Failed to detect leaked secrets, but the attack is still not prevented"
      );
    }
    log("\nHere's what the attack captured:\n", stolenGoods);
  });
}
run();
