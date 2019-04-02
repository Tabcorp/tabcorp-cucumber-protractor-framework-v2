#!/bin/sh
set -e
. /var/lib/buildkite-agent/.bash_profile

echo "current node"
echo node -v

echo "Use node LTS/Boron 6.12.3 version"
nvm install 8.15.0
nvm use 8.15.0

echo "run npm install"
npm install

echo "run synk test"
npm install -g snyk
snyk test