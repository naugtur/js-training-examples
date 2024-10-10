import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
import { join } from "path";
import { readData, writeData } from "./src/storage.js";

const fastify = Fastify({ logger: true });

const data = await readData();
setInterval(() => writeData(data), 5000);

await fastify.register(fastifyJwt, {
  secret: data.secret,
});

await fastify.register(fastifyStatic, {
  root: join(process.cwd(), "public"),
});

const authenticate = async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
};

fastify.post("/api/login", async (request) => {
  const { username, password } = request.body;
  if (username === data.user.login && password === data.user.password) {
    const token = fastify.jwt.sign({ id: username });
    return { token };
  }
  throw Error("Invalid credentials");
});

fastify.get("/api/pastries", async () => {
  return data.pastries;
});

fastify.post(
  "/api/pastries",
  { onRequest: [authenticate] },
  async (request) => {
    const { name, price } = request.body;
    data.pastries.push({ name, price });
    return { message: "Pastry added successfully" };
  }
);

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
