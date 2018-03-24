const bluetooth = require('node-bluetooth');
const money = require('../money.movement/app');
const lamp = require('../smartplug/index');

var interval;

function intervalFunc() {
  // create bluetooth device instance
  const device = new bluetooth.DeviceINQ();

  device
  .on('finished',  console.log.bind(console, 'finished'))
  .on('found', async function found(address, name){
    console.log('Found: ' + address + ' with name ' + name);
    //if (name === 'Yekaterina\'s Macbook') {
      await money();
      await lamp.toggleOn();
      if (interval)
        clearTimeout(interval);
      setTimeout(function() {
        lamp.toggleOff();
      }, 5000)
      console.log("Starting timeout")
      // setTimeout(() => {
      //   lamp.toggleOff();
      // }, 5000);
      // console.log("Ending timeout")
      // lamp();
    //}
  }).inquire();
}
lamp.toggleOff();
interval = setInterval(intervalFunc, 1500);