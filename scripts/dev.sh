#!/bin/bash

set -e

SOURCE=src
DIST=build
RESOURCES=resources

export NODE_ENV=development

if [ -d "$DIST" ]; then rm -Rf $DIST; fi

# RESOURCES
mkdir -p $DIST
cp -r $RESOURCES $DIST/$RESOURCES

# HTML 
cp -r web/* $DIST

webpack-dashboard -- webpack --config ./config/webpack.development.config.js
