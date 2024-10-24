const leaksSoMuch = [];

// Should be easy to spot
class leakingNamedObject {
  constructor() {
    this.joke =
      "Why do programmers prefer dark mode? Because light attracts bugs!".repeat(
        100
      );
  }
}

module.exports = async function startLeaking() {
  setInterval(() => {
    for (let i = 0; i < 100; i++) {
      leaksSoMuch.push(new leakingNamedObject());
    }
  }, 200);

  return "ok";
};
