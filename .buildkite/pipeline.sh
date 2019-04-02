#!/bin/bash

cat << EOM
steps:
  - name: ":cucumber: snyk test"
    command: scripts/buildkite-deploy-pr.sh
    agents:
      queue: ${QUEUE}
EOM
fi
