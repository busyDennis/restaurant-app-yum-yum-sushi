#!/bin/bash
#trap 'kill $(jobs)' SIGINT SIGTERM EXIT
if [ ! -d bower_components ]; then
    bower install
fi

node ./api/server.js