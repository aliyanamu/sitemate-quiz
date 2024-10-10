const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockData = require('./mockData.json');

const app = express();
const port = 8800;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const corsOptions = {
  origin:'http://localhost:4000', 
  credentials:true,
  optionSuccessStatus:200
};
app.use(cors(corsOptions));

// CREATE - POST /create
app.post('/create', (req, res) => {
  const newObject = req.body;
  console.log("Object created:", newObject);
  res.status(201).send({ message: "Object created", object: newObject });
});

// READ - GET /read
app.get('/read', (req, res) => {
  res.status(200).json(mockData.issues);
});

// UPDATE - PUT /update
app.put('/update', (req, res) => {
  const updatedObject = req.body;
  console.log("Object updated:", updatedObject);
  res.status(200).send({ message: "Object updated", object: updatedObject });
});

// DELETE - DELETE /delete/:id
app.delete('/delete/:id', (req, res) => {
  const objectId = req.params.id;
  console.log("Object deleted with ID:", objectId);
  res.status(200).send({ message: `Object with ID ${objectId} deleted` });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
