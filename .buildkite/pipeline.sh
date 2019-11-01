#!/usr/bin/env bash
set -euo pipefail

PIPELINE=${PIPELINE:-build}
BUILDKITE_AGENT_META_DATA_AWS_INSTANCE_ID="${BUILDKITE_AGENT_META_DATA_AWS_INSTANCE_ID:-}"
NEW_VERSION="$(git describe --tags --abbrev=0 develop)_$(git rev-parse --short=8 HEAD)"

buildkite-agent meta-data set "STEP" "pipelineupload" 2> /dev/null || export STEPLOCAL="pipelineupload"

function build() {
    cat <<EOF
steps:
  - name: ':hammer: Build'
    command: ./scripts/buildkite-build.sh
    skip: ${SKIP_build_step}
    agents:
      queue: ${QUEUE}
      aws:instance-id: ${BUILDKITE_AGENT_META_DATA_AWS_INSTANCE_ID}
  - wait
  - name: ':desktop_computer: Desktop UI - e2e v2 Tests'
    command: ./scripts/buildkite-e2e-v2.sh
    agents:
      queue: ${QUEUE}
      aws:instance-id: ${BUILDKITE_AGENT_META_DATA_AWS_INSTANCE_ID}
    env:
      PLATFORM_TAG: "@desktop"
  - wait
  - name: ":cucumber: snyk test"
    command: scripts/buildkite-deploy-pr.sh
    agents:
      queue: ${QUEUE}
EOF
}

# run the buildkite pipeline specified in the $PIPELINE environment variable (default: "build")
$PIPELINE

