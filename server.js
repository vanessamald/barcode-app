// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 
//const routes = require('./pages/api');
require('dotenv').config();

// use cors middleware
app.use(cors());

// Define middleware
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'corporate_data'
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));
  
// Get db connection
const db = mongoose.connection;

  // Define API route for fetching brands
  app.get('/api/brands', async (req, res) => {
    try {
      // Fetch brand data from MongoDB
      const collection = db.collection('mega_corporations');
      const results = await collection.find({}).limit(50).toArray();
      console.log(results);
      // Send response
      res.send(results).status(200);
    } catch (error) {
      console.error('Error fetching brand information:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});