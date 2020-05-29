const eagerCache = [];

const fastify = require("fastify")({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  eagerCache.push(request);
  reply.type("text/html").code(200);
  return `Hello from the server ${Math.random().toFixed(5)}`;
});

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`> ${address}`);
});
