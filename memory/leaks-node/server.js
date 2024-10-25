const { readdirSync } = require("fs");
const problems = readdirSync("./problems").map((file) => file.split(".")[0]);

const fastify = require("fastify")({
  logger: true,
});

fastify.decorateRequest("activeUsers", {});

fastify.addHook("preHandler", (req, reply, done) => {
  req.activeUsers.current = `User${Math.random().toFixed(8).substring(1)}`;
  done();
});

fastify.get("/", async (req) => {
  return `Hello, ${req.activeUsers.current}!`;
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

fastify.get("/heap", async (request, reply) => {
  throw Error("not implemented yet");
  // you work here
});

fastify.listen({
  port: 3000,
});
