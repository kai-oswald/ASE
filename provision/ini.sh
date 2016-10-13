#!/usr/bin/env bash

echo "Start provision"

sudo apt-get update
sudo apt-get upgrade -y

sudo apt-get install -y virtualbox-guest-dkms virtualbox-guest-utils curl

#node
echo "### installing nodejs###"
sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo sh
sudo apt-get install -y nodejs
node -v
npm -v

#mongodb
echo "### installing mongodb ###"
sudo apt-get install -y mongodb

#
echo "### install npm and dependencies ###"
sudo apt-get install npm -y
sudo apt-get install git -y
sudo npm config set registry http://registry.npmjs.org/
sudo npm install -g n
sudo n stable
sudo npm install -g nodemon
sudo npm install -g bower
sudo npm install -g bowcat

echo "### set up project ###"
sudo mkdir /var/www

sudo apt-get autoremove

echo "Finished provision"
echo "Go ahead!"