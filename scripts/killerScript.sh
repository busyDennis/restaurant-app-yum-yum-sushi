#!/bin/bash
# arg1 - grep pattern
declare -a commands=("firefox" "opera" "node" "express" "http-server" "mongod")

for comm in "${commands[@]}"
do
  ps --format pid,command | grep $comm | grep -oP "[0-9][0-9][0-9][0-9][0-9]*" | while read line ; do kill -9 $line ; done
done
