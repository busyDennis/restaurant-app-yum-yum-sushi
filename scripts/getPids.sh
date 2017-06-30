#!/bin/bash
# arg1 - grep pattern
sudo ps --format pid,command | grep $1 | grep -oP "[0-9][0-9][0-9][0-9][0-9]*"