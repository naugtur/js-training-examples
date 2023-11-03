#!/bin/bash

commit_sequences=("0 -" "1 -" "2 -" "3 -" "4 -" "5 -" "6 -" "7 -")
tags=("d0" "d1" "d2" "d3" "d4" "d5" "d6" "d7")

if [ ${#commit_sequences[@]} -ne ${#tags[@]} ]
then
    echo "The number of commit sequences and tags must be the same"
    exit 1
fi

for index in ${!commit_sequences[*]}
do
    commit_hash=$(git log --pretty=format:'%H %s' | grep "${commit_sequences[$index]}" | head -n 1 | cut -d ' ' -f1)

    if [ -z "$commit_hash" ]
    then
        echo "No commit found starting with ${commit_sequences[$index]}"
        continue
    fi
    echo tag -f ${tags[$index]} $commit_hash
    git tag -f ${tags[$index]} $commit_hash
done
