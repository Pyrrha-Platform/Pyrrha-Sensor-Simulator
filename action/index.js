const logger = require('pino')();
const fs = require('fs');
var mqtt = require('mqtt');
require('dotenv').config({ path: '.env.client' });

function main(params) {
    return new Promise((resolve, reject) => {
        var pemFile = fs.readFileSync(params.IOT_PEM);
        // the clientid format from the docs: d:orgId:deviceType:deviceId. 
        // const clientID = params.IOT_CLIENTID + `-${Date.now()}`;
        const options = {
            host: params.IOT_HOST,
            protocol: params.IOT_PROTOCOL,
            username: params.IOT_USERNAME,
            port: params.IOT_SECURE_PORT,
            password: params.IOT_PASSWORD,
            clientId: params.IOT_CLIENTID,
            cert: pemFile
        };

        const client = mqtt.connect(options);

        client.on('connect', function (err) {
            logger.info('connnected and ready to publish!');
            // publish(client, params);

            const data = {
                "firefighter_id": params.IOT_FIREFIGHTER_ID,
                "device_id": params.IOT_DEVICE_ID,
                "device_battery_level": (Math.random() * (0.00 - 100.00) + 0.0200).toFixed(2),
                "temperature": (Math.random() * 50).toFixed(2),
                "humidity": (Math.random() * 100).toFixed(2),
                "carbon_monoxide": (Math.random() * 150).toFixed(2),
                "nitrogen_dioxide": (Math.random() * 10).toFixed(2),
                "formaldehyde": (Math.random() * 10).toFixed(2),
                "acrolein": (Math.random() * 10).toFixed(2),
                "benzene": (Math.random() * 10).toFixed(2),
                "device_timestamp": getUTCTime()
            }

            const topic = `iot-2/evt/myevt/fmt/json`;

            client.publish(topic, JSON.stringify(data), (err) => {
                if (err) {
                    logger.error(err);
                    reject({ err: err });
                } else {
                    logger.info(`\n\n\nfinished publishing data`);
                    // console.log(`\n\n\nfinished publishing data: ${JSON.stringify(data)}`);
                }

                client.end();
                resolve({ msg: "published data" });
            });

        });

        client.on('message', function (topic, message) {
            logger.info('\n\n\n\n');
            logger.info(message.toString())
        })

        client.on('close', function (err) {
            if (err) { logger.info(err) };
            logger.info('connection closed');
        })

        client.on('disconnect', function (err) {
            logger.info('connection disconnected');
        })


        client.on('error', function (err) {
            console.log(err);
            logger.info('connection error');
            logger.info(err);
        })

    })
}

function getUTCTime() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getUTCSeconds();

    var newdate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return newdate;
}

exports.main = main;