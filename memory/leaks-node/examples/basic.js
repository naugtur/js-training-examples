const obviousLeak = [];

setInterval(() => {
  for (let i = 0; i < 100; i++) {
    obviousLeak.push({
      some: "long",
      silly: "object",
      that: "is",
      obviously: "leaking",
    });
  }
}, 200);
