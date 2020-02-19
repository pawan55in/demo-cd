#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo $BASE_DIR
echo "-------------------------------------------------------------------"



karma start angular-seed/config/karma-e2e.conf.js $*
