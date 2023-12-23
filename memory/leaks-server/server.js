const fastify = require("fastify")({
  logger: true,
});

fastify.get("/", async () => {
  return "Hello, world!";
});

fastify.get("/problem/:id", async (request, reply) => {
  const { id } = request.params;
  return require(`./problems/${id}`)(request, reply);
});

fastify.get("/heap", async (request, reply) => {
  global.gc();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  global.gc();
  require('v8').writeHeapSnapshot();
  // throw Error("not implemented yet");
  // 1. Implement returning memory info
  // 2. Implement saving a heap snapshot to disk
  // 3. (optionally) Force Garbage Collector before taking the snapshot
  // 4. Try writing heap snapshot on SIGUSR2
  // 5. Implement returning the heap snapshot as a response
});

fastify
  .listen({
    port: 3000,
  })
  