Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.box_version = "20161005.0.0"
  config.vm.provision :shell, path: "./provision/ini.sh"
  config.vm.provision :shell, path: "./provision/always.sh", run: 'always'
  config.vm.network :forwarded_port, host: 8001, guest: 1337
  config.vm.synced_folder "./node/", "/var/www/"
end