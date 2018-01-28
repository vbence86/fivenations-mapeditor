#!/bin/bash

set -e

SOURCE=src
DIST=build
RESOURCES=resources

export NODE_ENV=production

if [ -d "$DIST" ]; then rm -Rf $DIST; fi

webpack --config ./config/webpack.production.config.js -p --bail

# RESOURCES
cp -r $RESOURCES $DIST/$RESOURCES

# HTML 
cp -r web/* $DIST

echo "----------------------------------------------";
echo "             Build is successful!";
echo "----------------------------------------------";
