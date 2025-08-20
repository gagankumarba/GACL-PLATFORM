// We import the database connection functions we wrote earlier.
const { connectToMongoDB, connectToPostgreSQL } = require('./db');

// We create an instance of our Fastify web framework.
const fastify = require('fastify')({ logger: true });

// We import our custom GPS ingestion service.
const gpsIngestionService = require('./gps-ingestion');

// This is our first "route" or API endpoint.
// When someone visits the root URL (e.g., http://localhost:3000), it will send back a welcome message.
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// This is the function that starts our server and connects everything.
const start = async () => {
  try {
    // 1. Connect to our databases to get the client instances.
    const mongoClient = await connectToMongoDB();
    const pgClient = await connectToPostgreSQL();

    // 2. We use a Fastify decorator to explicitly attach the database client.
    // This makes the client available as `fastify.mongo.db` to all our services.
    fastify.decorate('mongo', { db: mongoClient });

    // 3. Register our custom GPS ingestion service.
    // This must be done after the decorator so the service can access the database.
    fastify.register(gpsIngestionService);

    // 4. Now, we start our server.
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// We call the start function to begin running our server.
start();
