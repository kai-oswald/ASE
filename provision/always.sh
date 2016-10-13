#!/bin/bash

cd /var/www/
export NODE_ENV=development
echo "### Checking node-modules ###"
npm install
echo "### Checking bower-modules ###"
bower install --allow-root
echo "### Running bowcat ###"
bowcat -m
echo "### Staring Node at http://localhost:8001 ###"
nodemon server