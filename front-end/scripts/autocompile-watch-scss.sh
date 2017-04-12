#!/bin/bash
#trap 'kill $(jobs)' SIGINT SIGTERM EXIT
nodemon -e scss -x \"node-sass --include-path scss css/style.scss css/style.css\"
