const fastify = require("fastify");
const mercurius = require("mercurius");

const app = fastify({
  logger: true,
});

// Define your stateful resolver class
class HelloResolver {
  constructor() {
    this.counter = 0;
  }

  hello() {
    this.counter++;
    this["leak" + this.counter] = "LOL LOL".repeat(100000);

    return `Hello, world! (${this.counter} times)`;
  }
}

// Create an instance of the resolver class
const resolver = new HelloResolver();

const schema = `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => resolver.hello(),
  },
};

app.register(mercurius, {
  schema,
  resolvers,
});

app.listen({ port:3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server is running on http://localhost:3000");
});
