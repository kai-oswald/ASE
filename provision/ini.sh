#!/usr/bin/env bash

echo "Start provision"

sudo apt-get update

sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo sh
sudo apt-get install -y nodejs

sudo apt-get install -y virtualbox-guest-dkms virtualbox-guest-utils


echo "### install mysql ###"
sudo apt-get install debconf-utils -y
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password 1234"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password 1234"

sudo apt-get install mysql-server -y

echo "### install bower ###"
sudo apt-get install curl -y
sudo apt-get install npm -y
sudo apt-get install git -y
sudo npm config set registry http://registry.npmjs.org/
sudo npm install -g n
sudo n stable

npm install nodemon -g
npm install express -g

echo "### set up project ###"
sudo mkdir /var/www
cd /var/www/
nodemon main.js

#echo "# bootstrap.sql #"
#mysql < sql/bootstrap.sql -u root -p1234
#echo "# datadefinition.sql #"
#mysql < sql/datadefinition.sql -u root -p1234
#echo "# datamanipulation.sql #"
#mysql < sql/datamanipulation.sql -u root -p1234

sudo apt-get autoremove

echo "Finished provision"
echo "Go ahead!"