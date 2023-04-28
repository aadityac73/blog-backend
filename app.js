const http = require('http');
const express = require('express');
const cors = require('cors');
const envVars = require('./config/envVars');
const models = require('./models')
const apiRoutes = require('./routes');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'))

app.use('/api', apiRoutes)

server.listen(envVars.PORT, () => {
  console.log('Serven started on port', envVars.PORT);
});
