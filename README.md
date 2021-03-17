# Prometeo sensor simulator

This repository will contain the [Prometeo](https://github.com/Call-for-Code/Prometeo) solution sensor simulator.

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack)

## TBD

```bash
#!/bin/bash
echo ">>> Downloading Whisk Deploy…"
wget https://github.com/apache/incubator-openwhisk-wskdeploy/releases/download/latest/openwhisk_wskdeploy-latest-linux-amd64.tgz
echo ">>> Installing Whisk Deploy…"
mkdir openwhisk
tar -zxvf ./openwhisk_wskdeploy-latest-linux-amd64.tgz -C ./openwhisk
rm -rd ./openwhisk_wskdeploy-latest-linux-amd64.tgz
echo ">>> Checking installed version of Whisk Deploy…"
./openwhisk/wskdeploy version
echo ">>> Checking installed version of IBM Cloud CLI…"
bx –version
echo ">>> Logging into IBM Cloud…"
bx login –apikey $DEPLOYER_API_KEY -a api.ng.bluemix.net -o "$ORG" -s "$SPACE"
echo ">>> Replacing FEED_BASE In Manifest File…"
sed -i "s/@FEED_BASE@/$FEED_BASE/g" manifest.yaml
echo ">>> Contents Of Manifest File:"
cat manifest.yaml
echo ">>> Currently Deployed Packages:"
bx wsk package list
echo ">>> Currently Deployed Actions:"
bx wsk action list
echo ">>> Currently Deployed Triggers:"
bx wsk trigger list
echo ">>> Currently Deployed Rules:"
bx wsk rule list
echo ">>> Deploying Actions Using WhiskDeploy…"
./openwhisk/wskdeploy -p .
echo ">>> Successfully Deployed Actions Using WhiskDeploy."
```
