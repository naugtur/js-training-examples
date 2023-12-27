#!/bin/bash

npx clinic heapprofiler --autocannon [ /problem/04 --method GET -d 2 ] -- node server.js
npx clinic --version