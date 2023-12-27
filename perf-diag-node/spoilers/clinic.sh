#!/bin/bash

num=${1:-"01"}


npx clinic flame --autocannon [ /problem/$num --method GET -c 1 -d 10 ] -- node server.js