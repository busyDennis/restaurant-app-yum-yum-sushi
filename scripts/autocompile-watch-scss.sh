#!/bin/bash
#trap 'kill $(jobs)' SIGINT SIGTERM EXIT
nodemon -e scss -x \"node-sass --include-path scss src/style/style.scss src/style/style.css\"
