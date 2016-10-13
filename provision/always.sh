#!/bin/bash

cd /var/www/
export NODE_ENV=development
echo "### Checking node-modules ###"
npm install --no-bin-links
echo "### Checking bower-modules ###"
bower install --allow-root
echo "### Running bowcat ###"
bowcat -m -o lib
echo "### Starting Node at http://localhost:8001 ###"
nodemon -L server