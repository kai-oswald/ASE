#!/usr/bin/env bash

echo "Start provision"

sudo apt-get update

sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo sh
sudo apt-get install -y nodejs

sudo apt-get install -y virtualbox-guest-dkms virtualbox-guest-utils


#echo "### install mysql ###"
#sudo apt-get install debconf-utils -y
#sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password 1234"
#sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password 1234"

#sudo apt-get install mysql-server -y

#node
echo "### install nodejs###"
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
node -v
npm -v

#mongodb
echo "### mongodb ###"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org
#mongo 

#nodejs tools
echo "### install nodejs tools###"
sudo npm install -g grunt-cli yo generator-meanjs

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
nodemon server.js

#echo "# bootstrap.sql #"
#mysql < sql/bootstrap.sql -u root -p1234
#echo "# datadefinition.sql #"
#mysql < sql/datadefinition.sql -u root -p1234
#echo "# datamanipulation.sql #"
#mysql < sql/datamanipulation.sql -u root -p1234

sudo apt-get autoremove

echo "Finished provision"
echo "Go ahead!"