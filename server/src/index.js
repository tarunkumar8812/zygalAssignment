const express = require('express');
const route = require('./routes/route.js');
const app = express();
const cors = require('cors')
require("dotenv").config()
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

app.use(cors())

app.use('/', route);

app.listen((process.env.PORT || 3001), function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});

