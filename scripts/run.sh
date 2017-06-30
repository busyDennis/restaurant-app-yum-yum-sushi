#!/bin/bash

#Kill all child processes on exit with 'trap'
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

firejail firefox  &

#Display Angular documentation:
#node ~/.npm-global/bin/http-server front-end/docs -a 127.0.0.1 -p 8081 &
http-server front-end/docs -a 127.0.0.1 -p 8081 &

#Start the web application
cd front-end
npm start &
cd ../back-end
npm start