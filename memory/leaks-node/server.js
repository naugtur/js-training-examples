const { readdirSync, mkdirSync } = require("fs");
const v8 = require("v8");
const { observe } = require("@naugtur/memory-leak-warning");
const { setTimeout } = require("timers/promises");

const problems = readdirSync("./problems").map((file) => file.split(".")[0]);

const fastify = require("fastify")({
  logger: true,
});

observe({
  logger: (message) => {
    fastify.log.error(message);
  },
  historyLength: 10,
  roundToBytes: 1024*1024,
});

// This is deprecated. And bad. Don't do this ;)
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

mkdirSync("./Heaps", { recursive: true });

fastify.get("/heap", async (request, reply) => {
  global.gc();
  await setTimeout(1000);
  global.gc();
  v8.writeHeapSnapshot(`./Heaps/heap-${Date.now()}.heapsnapshot`);
  const stats = v8.getHeapSpaceStatistics();
  reply.send(stats);
});

fastify.get("/mem", async (request, reply) => {
  global.gc();
  const current = process.memoryUsage();
  const stats = v8.getHeapSpaceStatistics();
  stats.forEach((stat) => {
    if (["new_space", "old_space"].includes(stat.space_name)) {
      current[stat.space_name] = stat.space_used_size;
    }
  });
  Object.entries(current).forEach(([key, value]) => {
    current[key] = `${(value / 1024 / 1024).toFixed(2)} MB`;
  });
  reply.send(current);
});

fastify.listen({
  port: 3000,
});

// For education purposes. Not actual instrumentation.

const mb = (v) => Math.round(v / 1024 / 1024);
setInterval(() => {
  const mem = process.memoryUsage();
  const us = mb(mem.heapUsed);
  const tot = mb(mem.heapTotal);
  const rss = mb(mem.rss);
  console.error(
    `MEM:MB:${"=".repeat(us)}${"-".repeat(tot - us)}${"_".repeat(rss - tot)}`
  );
}, 5000);
