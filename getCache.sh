#!/bin/bash

dir="$(dirname "$0")"
dist_dir="${dir}/dist/"
src_dir="${dir}/src/"
echo -e "\n" >> "${dist_dir}/sw.js"
for f in $(find "$dist_dir" -type f); do
    filename="${f#"$dist_dir"}"
    echo "CACHE_URLS.push('${filename}');" >> "${dist_dir}/sw.js"
done