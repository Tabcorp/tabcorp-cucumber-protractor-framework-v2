#!/bin/bash

echo "start v2 automation react app"
source ~/.nvm/nvm.sh && nvm use
npm start > /dev/null 2>&1 &

echo "Wait for the application to launch on the given port"
while netstat -lnt | awk '$4 ~ /:3000$/ {exit 1}'; do sleep 10; done

echo "run e2e"
npm run e2e || exit 1
