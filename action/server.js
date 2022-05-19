const server = require("./index");
require("dotenv").config();
const deviceFile = require("./devices.json");

const devices = deviceFile.devices;

var cron = require("node-cron");

console.log(process.env.IOT_SECURE_PORT);

devices.forEach((device) => {
  console.log(`Found device: ${device.IOT_DEVICE_ID}`);
});

cron.schedule("* * * * *", () => {
  console.log("running a task every minute");

  devices.forEach((device) => {
    let params = {
      IOT_HOST: process.env.IOT_HOST,
      IOT_PROTOCOL: process.env.IOT_PROTOCOL,
      IOT_SECURE_PORT: process.env.IOT_SECURE_PORT,
      IOT_FIREFIGHTER_ID: device.IOT_FIREFIGHTER_ID,
      IOT_DEVICE_ID: device.IOT_DEVICE_ID,
      IOT_CLIENTID: device.IOT_CLIENTID,
      IOT_USERNAME: process.env.IOT_USERNAME,
      IOT_PASSWORD: device.IOT_PASSWORD,
    };
    
    server
      .main(params)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
