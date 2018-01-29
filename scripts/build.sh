#!/bin/bash

set -e

SOURCE=src
DIST=build
RESOURCES=resources
LIBRARIES=lib

export NODE_ENV=production

if [ -d "$DIST" ]; then rm -Rf $DIST; fi

webpack --config ./config/webpack.production.config.js -p --bail

# RESOURCES
cp -r $RESOURCES $DIST/$RESOURCES

# EXTERNAL LIBRARIES
cp -r $LIBRARIES $DIST/$LIBRARIES

# HTML 
cp -r web/* $DIST

echo "----------------------------------------------";
echo "             Build is successful!";
echo "----------------------------------------------";
