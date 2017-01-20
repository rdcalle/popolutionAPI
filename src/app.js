const express = require('express');  
const bodyParser = require('body-parser');  
const mongoose = require('mongoose');  
const cors = require('cors');

import debug from './middleware/debug';

require('./models/user');

const router = require('./routes/index');

const app = express();  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true}));  
app.use(cors());  
app.set('port', 3000);

app.use(debug.printReq);
app.use(router);


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/popolution_development', (err) => {
	err && console.error(err)
  app.listen(app.get('port'), () =>
    console.log('Express corriendo en http://localhost:3000')
  );
});