const bluetooth = require('node-bluetooth');
 
// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

//device.listPairedDevices(console.log);

device
.on('finished',  console.log.bind(console, 'finished'))
.on('found', function found(address, name){
  console.log('Found: ' + address + ' with name ' + name);
//   bluetooth.connect(address, channel, function(err, connection){
//     if(err) return console.error(err);
   
//     connection.on('data', (buffer) => {
//       console.log('received message:', buffer.toString());
//     });
   
//     connection.write(new Buffer('Hello!', 'utf-8'));
//   });
}).inquire();