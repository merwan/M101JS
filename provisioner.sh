locale-gen fr_FR.UTF-8
echo "Europe/Paris" > /etc/timezone
dpkg-reconfigure -f noninteractive tzdata

# MongoDB
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
# NodeJS
curl -sL https://deb.nodesource.com/setup | sudo bash -

# apt install
apt-get update
apt-get install -y mongodb-org
apt-get install -y nodejs build-essential
