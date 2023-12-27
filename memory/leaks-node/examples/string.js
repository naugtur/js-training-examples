function noReferenceLeftAlive() {
  let long = new Array(1000000).fill("LOL ").join("");
  const leak = long.slice(0, 20);
  return leak;
}

const shortStrings = [];
setInterval(() => {
  shortStrings.push(noReferenceLeftAlive());
  console.log("and now we wait");
}, 5000);

// force fix: https://www.npmjs.com/package/flatstr
// It's also a matter of using strings reasonably and looking for this issue if you're in trouble.
// Don't apply flatstr to every string all over the place, just when you find you need it.
