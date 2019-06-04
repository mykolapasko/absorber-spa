'use strict';
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  bodyParser = require('body-parser')
  // ,SerialPort = require('serialport')
  ;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/dbelements');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('src'));

//Serialport start
// const ByteLength = SerialPort.parsers.ByteLength;
// const serial_port = new SerialPort('COM1', 
// 	{ 
// 		boudrate: 9600,
// 		dataBits: 7
// 	});

// const parser = serial_port.pipe(new ByteLength({length: 14}));
// let count = 0;
// let lastresult = '';
// function counter(data){
//   if(++count == 5){
//     lastresult = data;
//     count = 0;
//   }
// }

// parser.on('data', counter);
// app.get('/weight', function(req, res) {
// 	res.send(lastresult);
// });
//Serialport finish


var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
