# Pyrrha device simulator

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/static/v1?label=Slack&message=%23prometeo-pyrrha&color=blue)](https://callforcode.org/slack)

This repository will contain the [Pyrrha](https://github.com/Pyrrha-Platform/Pyrrha) solution device simulator.

## Setting up the solution

### Code overview

This Apache OpenWhisk serverless function creates a MQTT client for the Pyrrha solution. The client sends the following message as an IoT device to the IoT platform every minute:

```json
{
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
```

### Add devices to the database

This solution was built to make use of Pyrrha's MQTT broker service VerneMQ. Device authentication is handled directly with the VerneMQ service along with a database table, as well as MQTT broker duties.

Device information can be inserted directly into this table by first connecting to the database service and running INSERT statements. The instructions for this can be found in the Docker Compose deployment instructions in the `pyrrha-simulator` section.

### Edit configuration

The following parameters need to be set as local environment variables or as Github Actions environment secrets for the code to work. You can fill out `.example.sh` and run `source ./.example.sh` to create the environment variables locally.

```sh
IOT_HOST=""
IOT_PROTOCOL=""
IOT_SECURE_PORT=""
```

## Deployment

### Run locally

The action is a simple Node.js application. Execute the following steps to run it locally:

1. Install the dependencies

   ```sh
   npm install
   ```

1. Run the code

   ```sh
   npm start
   ```

### Run on IBM Cloud

1. Install the dependencies

   ```sh
   npm install
   ```

1. Deploy the code

   ```sh
   ibmcloud fn deploy
   ```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting Pyrrha pull requests.

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
