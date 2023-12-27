#!/bin/bash

node --heapsnapshot-signal=SIGUSR2 examples/graphql.js &
## save the pid of the last command
pid=$!
## wait for the server to start
sleep 1

## get a heap
kill -SIGUSR2 $pid

sleep 3

autocannon -c10 -d2 'http://localhost:3000/graphql' -m 'POST' --headers 'Content-Type: application/json' --body '{"query":"{ hello }"}'

sleep 1

## get a heap
kill -SIGUSR2 $pid

sleep 3

kill $pid