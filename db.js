// This file will contain all of our database connection code.

// Require the two drivers we just installed.
const { MongoClient } = require('mongodb');
const { Client } = require('pg');

// These are our connection details.
// NOTE: You will need to replace these placeholder values with your actual database information later.
const MONGO_DB_URL = 'mongodb+srv://gagankumarba:6d70briOYw6i3Imb@cluster0.36ypxtw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const POSTGRES_DB_URL = 'postgresql://postgres:Schitts%23creek0@gacl-geospatial.cdu6e2qkwjpb.eu-north-1.rds.amazonaws.com:5432/postgres';
let mongoClientInstance;

// Function to connect to MongoDB
async function connectToMongoDB() {
  if (mongoClientInstance) return mongoClientInstance;
  const client = new MongoClient(MONGO_DB_URL);
  try {
    await client.connect();
    mongoClientInstance = client.db();
    console.log("Connected to MongoDB");
    return mongoClientInstance;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

// Function to connect to PostgreSQL
async function connectToPostgreSQL() {
  const client = new Client(POSTGRES_DB_URL);
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");
    return client;
  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    process.exit(1);
  }
}

// We'll export these functions so our main server file can use them.
module.exports = {
  connectToMongoDB,
  connectToPostgreSQL,
};
