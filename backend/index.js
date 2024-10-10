const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

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

app.use('/', routes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
