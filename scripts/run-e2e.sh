#!/bin/bash

echo "navigate to the the v2 react app"
cd v2-automation-react-app
source ~/.nvm/nvm.sh && nvm use

echo "start v2 automation react app"
npm start > /dev/null 2>&1 &

echo "navigate back to root of v2 framework"
cd ..

echo "run e2e"
npm run e2e || exit 1
