const fastify = require("fastify")({
  logger: true,
});
const semver = require("semver");

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ valid: semver.valid(request.query.v) });
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
