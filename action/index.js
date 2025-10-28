const logger = require("pino")();
const fs = require("fs");
var mqtt = require("mqtt");

function main(params) {
  return new Promise((resolve, reject) => {
    const options = {
      host: params.IOT_HOST,
      protocol: params.IOT_PROTOCOL,
      port: params.IOT_SECURE_PORT,
      clientId: params.IOT_CLIENTID,
      username: params.IOT_DEVICE_ID,
      password: params.IOT_PASSWORD,
    };

    const client = mqtt.connect(options);

    client.on("connect", function (packet) {
      // if (err) {
      //   console.log(`error connecting ${params.IOT_DEVICE_ID}`);
      //   console.log(JSON.stringify(err));
      // }
      logger.info("connnected and ready to publish!");
      // publish(client, params);

      const data = {
        firefighter_id: params.IOT_FIREFIGHTER_ID,
        device_id: params.IOT_DEVICE_ID,
        device_battery_level: (Math.random() * (0.0 - 100.0) + 0.02).toFixed(2),
        temperature: (Math.random() * 50).toFixed(2),
        humidity: (Math.random() * 100).toFixed(2),
        carbon_monoxide: (Math.random() * 150).toFixed(2),
        nitrogen_dioxide: (Math.random() * 10).toFixed(2),
        formaldehyde: (Math.random() * 10).toFixed(2),
        acrolein: (Math.random() * 10).toFixed(2),
        benzene: (Math.random() * 10).toFixed(2),
        device_timestamp: getUTCTime(),
      };

      // const topic = `iot-2/evt/myevt/fmt/json`;
      const topic = "iot-2/evt/myevt";

      client.publish(topic, JSON.stringify(data), (err) => {
        if (err) {
          logger.error(err);
          reject({ err: err });
        } else {
          logger.info(
            `\n\n\nfinished publishing data: ${JSON.stringify(data)}`
          );
        }

        client.end();
        resolve({ msg: "published data" });
      });
    });

    client.on("message", onMessage);

    client.on("close", onClose);

    client.on("disconnect", onDisconnect);

    client.on("error", onError);
  });
}

function onMessage(topic, message) {
  logger.info("\n\n\n\n");
  logger.info(message.toString());
}

function onClose(err) {
  if (err) {
    logger.info(err);
  }
  logger.info("connection closed");
}

function onDisconnect(err) {
  logger.info("connection disconnected");
}

function onError(err) {
  logger.error("connection error");
  logger.error(err);
}

function getUTCTime() {
  var dateObj = new Date();
  var month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //months from 1-12
  var day = String(dateObj.getUTCDate()).padStart(2, '0');
  var year = dateObj.getUTCFullYear();
  var hours = String(dateObj.getUTCHours()).padStart(2, '0');
  var minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
  var seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');

  var newdate =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return newdate;
}

exports.main = main;
