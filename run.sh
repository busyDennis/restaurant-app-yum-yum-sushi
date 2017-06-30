#!/bin/bash
export NODE_ENV=development
firejail firefox  &
#node ~/.npm-global/bin/http-server front-end/docs -a 127.0.0.1 -p 8081 &
http-server front-end/docs -a 127.0.0.1 -p 8081 &
cd front-end
npm start &
cd ../back-end
npm start