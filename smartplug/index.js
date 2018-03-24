var TPLink = require('tplink-cloud-api')
var uuidV4 = require('uuid/v4')

async function init() {
  let myTPLink = await TPLink.login('craklyn@gmail.com', 'fountainPW');
  let deviceList = await myTPLink.getDeviceList();
  //console.log(deviceList);
  
  myPlug = myTPLink.getHS110("The Fountain");
  console.log(myPlug);
  myPlug.toggle();  
}

async function toggleOn() {
  let myTPLink = await TPLink.login('craklyn@gmail.com', 'fountainPW');
  let deviceList = await myTPLink.getDeviceList();
  //console.log(deviceList);
  
  myPlug = myTPLink.getHS110("The Fountain");
  console.log(myPlug);
  myPlug.powerOn();  
}

async function toggleOff() {
  let myTPLink = await TPLink.login('craklyn@gmail.com', 'fountainPW');
  let deviceList = await myTPLink.getDeviceList();
  //console.log(deviceList);
  
  myPlug = myTPLink.getHS110("The Fountain");
  console.log(myPlug);
  myPlug.powerOff();  
}


module.exports = {'toggleOn': toggleOn, 'toggleOff': toggleOff};

//let deviceList = await myTPLink.getDeviceList()

//let deviceName = "The fountain"
