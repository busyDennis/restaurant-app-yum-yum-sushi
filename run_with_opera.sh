#!/bin/bash
export NODE_ENV=development
opera &
node ~/.npm-global/bin/http-server front-end/docs -a 127.0.0.1 -p 8081 &
cd front-end
npm run start-with-opera &
cd ../back-end
node --debug server.js