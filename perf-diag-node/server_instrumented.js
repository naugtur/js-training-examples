const blocked = require("blocked");
blocked((ms, stack) => {
  console.error(`Blocked for ${ms}ms ${stack}`);
});

const { readdirSync } = require("fs");
const problems = readdirSync("./problems").map((file) => file.split(".")[0]);

const fastify = require("fastify")({
  logger: true,
});

fastify.get("/", async () => {
  return "Hello, world!";
});

const problemHandler = async (request, reply) => {
  let { id } = request.params;
  if (!problems.includes(id)) {
    id = problems.find((problem) => problem.startsWith(id));
  }
  return require(`./problems/${id}`)(request, reply);
};

fastify.get("/problem/:id", problemHandler);
fastify.post("/problem/:id", problemHandler);

fastify.listen({
  port: 3000,
});
