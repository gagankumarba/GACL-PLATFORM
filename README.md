# GACL Platform - Geospatial Engine

This repository contains the code for the Geospatial Engine of the GACL Platform - a high-performance GPS data ingestion service designed for vehicle tracking and location analytics.

## 🎯 Project Overview

The GACL Platform Geospatial Engine is a Node.js-based API service that provides real-time GPS data ingestion capabilities for vehicle tracking systems. It's built with scalability and performance in mind, using modern web technologies and geospatial databases.

### Key Features

- **Real-time GPS Data Ingestion**: RESTful API endpoint for receiving vehicle location data
- **Geospatial Data Storage**: MongoDB with GeoJSON support for efficient location queries
- **Dual Database Architecture**: MongoDB for GPS data + PostgreSQL for additional data
- **High Performance**: Built with Fastify framework for optimal speed
- **Data Validation**: JSON schema validation for incoming GPS data
- **Modular Design**: Clean separation of concerns with plugin-based architecture

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vehicle Apps  │───▶│  GACL Platform  │───▶│   MongoDB       │
│   (GPS Devices) │    │  (Fastify API)  │    │   (GPS Data)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   PostgreSQL    │
                       │   (Additional   │
                       │    Data)        │
                       └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database (cloud or local)
- PostgreSQL database (cloud or local)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gagankumarba/GACL-PLATFORM.git
   cd GACL-PLATFORM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure database connections**
   
   Update the connection strings in `db.js`:
   ```javascript
   const MONGO_DB_URL = 'your-mongodb-connection-string';
   const POSTGRES_DB_URL = 'your-postgresql-connection-string';
   ```

4. **Start the server**
   ```bash
   node server.js
   ```

The server will start on `http://localhost:3000`

## 📡 API Documentation

### GPS Data Ingestion Endpoint

**POST** `/api/v1/gps`

Ingests GPS location data from vehicle tracking devices.

#### Request Body Schema

```json
{
  "vehicle_id": "string",
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "timestamp": "ISO 8601 date-time string"
}
```

#### Example Request

```bash
curl -X POST http://localhost:3000/api/v1/gps \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": "V-7890",
    "location": {
      "type": "Point",
      "coordinates": [-0.18, 51.15]
    },
    "timestamp": "2025-08-20T10:00:00Z"
  }'
```

#### Example Response

```json
{
  "success": true,
  "insertedId": "507f1f77bcf86cd799439011"
}
```

### Health Check Endpoint

**GET** `/`

Returns a simple health check response.

```json
{
  "hello": "world"
}
```

## 📁 Project Structure

```
GACL-PLATFORM/
├── server.js              # Main server entry point
├── db.js                  # Database connection management
├── gps-ingestion.js       # GPS data ingestion service
├── gps-data.json          # Sample GPS data for testing
├── package.json           # Project dependencies and metadata
└── README.md             # This file
```

## 🔧 Configuration

### Environment Variables

For production deployment, consider using environment variables for database connections:

```bash
export MONGO_DB_URL="your-mongodb-connection-string"
export POSTGRES_DB_URL="your-postgresql-connection-string"
```

### Database Setup

#### MongoDB Collections

The service automatically creates a `gps_pings` collection in MongoDB with the following structure:

```javascript
{
  vehicle_id: String,
  location: {
    type: "Point",
    coordinates: [Number, Number]  // [longitude, latitude]
  },
  timestamp: Date
}
```

#### PostgreSQL

PostgreSQL connection is established but not currently used for data storage. It's available for future expansion of the platform.

## 🧪 Testing

### Sample Data

Use the provided `gps-data.json` file for testing:

```bash
curl -X POST http://localhost:3000/api/v1/gps \
  -H "Content-Type: application/json" \
  -d @gps-data.json
```

### Validation

The API includes automatic validation for:
- Required fields (vehicle_id, location, timestamp)
- GeoJSON Point format
- Coordinate array structure (2 numbers: longitude, latitude)
- ISO 8601 timestamp format

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Use environment variables for database connections
2. **Process Management**: Use PM2 or similar for process management
3. **Load Balancing**: Consider using a reverse proxy (nginx) for load balancing
4. **Monitoring**: Implement logging and monitoring solutions
5. **Security**: Add authentication and rate limiting for production use

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub: [GACL-PLATFORM Issues](https://github.com/gagankumarba/GACL-PLATFORM/issues)
- Contact the development team

## 🔮 Future Enhancements

- [ ] Authentication and authorization
- [ ] Rate limiting
- [ ] GPS data analytics endpoints
- [ ] Real-time vehicle tracking dashboard
- [ ] Geofencing capabilities
- [ ] Historical data querying
- [ ] Data export functionality
- [ ] WebSocket support for real-time updates
