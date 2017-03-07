#!/bin/sh -e

cd `dirname $0`/..

mkdir -p public/js
cp node_modules/clipboard/dist/clipboard.min.js public/js/
