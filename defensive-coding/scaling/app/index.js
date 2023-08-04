const fastify = require("fastify")({
  logger: true,
});
const semver = require("semver");
/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */
const opts = {
  schema: {
    query: {
      type: 'object',
      required: ['v'],
      properties: {
        v: { type: 'string' },
      }
    }
  }
}

fastify.get('/', opts, async (request, reply) => {
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
