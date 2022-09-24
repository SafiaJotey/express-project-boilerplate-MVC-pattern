const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// 3rd=party middle wires
app.use(cors());

//build-in middlewires
app.use(express.json());
//port
const port = process.env.PORT || 5000;

//import
const dbConnect = require('./utils/dbConnect');
const toolsRoute = require('./routes/v1/tools.route');
const { viewcount } = require('./middlewires/viewcount.Js');
const { errorHandler } = require('./middlewires/errorHandler');

//application leve midlewires
// app.use(viewcount);

//DB connection
dbConnect();

//Routes
app.use('/api/v1/tools', toolsRoute);

app.get('/', (req, res) => {
  res.send('the app is running');
});

app.all('*', (req, res) => {
  res.send('No route found!');
});

//global error handler
app.use(errorHandler);
//listen
app.listen(port, () => {
  console.log('the app is running on port', port);
});
process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
