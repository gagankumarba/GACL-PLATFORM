const fastifyPlugin = require('fastify-plugin');

/**
 * Encapsulates the GPS Ingestion business logic.
 * The Fastify plugin architecture ensures a clean, modular application structure.
 */
async function gpsIngestionService(fastify, options) {

  // We define the schema for our incoming data. This is crucial for validation.
  // We expect a GeoJSON object with a specific structure.
  const locationSchema = {
    type: 'object',
    properties: {
      vehicle_id: { type: 'string' },
      location: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['Point'] },
          coordinates: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2
          }
        },
        required: ['type', 'coordinates']
      },
      timestamp: { type: 'string', format: 'date-time' }
    },
    required: ['vehicle_id', 'location', 'timestamp']
  };

  // This is the API endpoint that the driver apps will send data to.
  // It is a POST request, which is used to create or send new data.
  fastify.post('/api/v1/gps', { schema: { body: locationSchema } }, async (request, reply) => {
    try {
      // The `mongodb` client instance is available from our db.js file.
      const mongoDb = fastify.mongo.db;

      // We will save the incoming data to a new 'gps_pings' collection.
      const result = await mongoDb.collection('gps_pings').insertOne(request.body);

      // Log the success and return a confirmation message.
      fastify.log.info(`Received GPS ping from vehicle ID: ${request.body.vehicle_id}`);
      return { success: true, insertedId: result.insertedId };
    } catch (error) {
      // If there's an error, we'll log it and send a descriptive error message.
      fastify.log.error(error);
      reply.code(500).send({ success: false, message: 'Failed to ingest GPS data' });
    }
  });
}

// We wrap our service in a Fastify plugin for proper encapsulation.
module.exports = fastifyPlugin(gpsIngestionService);
