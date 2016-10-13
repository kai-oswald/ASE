#!/usr/bin/env bash

echo "Start provision"

sudo apt-get update
sudo apt-get upgrade -y

sudo apt-get install -y virtualbox-guest-dkms virtualbox-guest-utils

#node
echo "### install nodejs###"
sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo sh
sudo apt-get install -y nodejs
node -v
npm -v

#mongodb
echo "### mongodb ###"
sudo apt-get install -y mongodb

#
echo "### install bower ###"
sudo apt-get install curl -y
sudo apt-get install npm -y
sudo apt-get install git -y
sudo npm config set registry http://registry.npmjs.org/
sudo npm install -g n
sudo n stable
sudo npm install -g nodemon
sudo npm install -g bower

echo "### set up project ###"
sudo mkdir /var/www

#echo "# bootstrap.sql #"
#mysql < sql/bootstrap.sql -u root -p1234
#echo "# datadefinition.sql #"
#mysql < sql/datadefinition.sql -u root -p1234
#echo "# datamanipulation.sql #"
#mysql < sql/datamanipulation.sql -u root -p1234

sudo apt-get autoremove

echo "Finished provision"
echo "Go ahead!"