const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { ReadlineParser } = require('@serialport/parser-readline')

var SerialPort = require('serialport').SerialPort;

let savedData = {};

var port = 3000;

var arduinoCOMPort = "/dev/cu.usbserial-0001";

var arduinoSerialPort = new SerialPort({ 
  path: arduinoCOMPort,
  baudRate: 9600
});

const parser = arduinoSerialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))

io.on('connection', function(socket) {
  console.log('Node is listening to port');

  socket.on('lalajs', function() {
    io.emit('data', savedData);
  });
});

parser.on('data', function(data) {
  console.log('Received data from port: ' + data);
  savedData = data;
  console.log('emit data', data);
  io.emit('data', data);
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/:action', function (req, res) {
    
   var action = req.params.action || req.param('action');
    
    if(action == 'led') {
        arduinoSerialPort.write("w");
        return res.send({ on: true });
    } 
    if(action == 'off') {
        arduinoSerialPort.write("t");
        return res.send({ on: false });
    }
    
    return res.send({ action });
});

server.listen(port, function () {
  console.log('Example app listening on port http://0.0.0.0:' + port + '!');
});