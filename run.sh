

#!/bin/bash

args="$@"

args="$@ -p 3000"

file=/db.json
if [ -f $file ]; then
    echo "Found db.json, trying to open"
    args="$args db.json"
fi

json-server $args