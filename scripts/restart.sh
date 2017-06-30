#!/bin/bash
declare -a commands=("firefox" "node" "express" "http-server" "mongod")

for comm in "${commands[@]}"
do
  ps --format pid,command | grep $comm | grep -oP "[0-9][0-9][0-9][0-9][0-9]*" | while read line ; do kill -9 $line ; done
done

firejail firefox &
node ~/.npm-global/bin/http-server front-end/docs -a 127.0.0.1 -p 8081 &
cd front-end
npm start &
node --debug ../back-end/server.js