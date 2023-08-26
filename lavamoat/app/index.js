const fastify = require("fastify")({
  logger: true,
});
const semver = require("semver");

const indulgeMeWithAPoem = require("evil_sample");

const fastifyCaching = require("@fastify/caching");

fastify.register(
  fastifyCaching,
  { privacy: fastifyCaching.privacy.NOCACHE },
  (err) => {
    // nevermind
  }
);

fastify.get("/", async (request, reply) => {
  reply.send({ valid: semver.valid(request.query.v) });
});

fastify.get("/poem", async (request, reply) => {
  reply.send(
    indulgeMeWithAPoem(
      "1cd543bb7110a3a2ec49cbe0eb321232622f6b3d2abaec57466bae0b4085c9c2"
    )
  );
});

const getFakeUserState = () => {
  return {};
};

fastify.get("/admin", async (request, reply) => {
  const userState = getFakeUserState();

  reply.send({ allowed: !!userState.isAdmin });
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
