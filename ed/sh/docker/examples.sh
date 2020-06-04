# Examples


sudo ifconfig lo0 alias 10.254.254.254

docker network create --driver bridge xnet

docker run -ti --rm --net=xnet -v $PWD:/gh -w /gh cn007b/python /bin/bash

### Linux

# Ubuntu
docker pull cn007b/ubuntu
docker tag cn007b/ubuntu xubuntu
docker run -ti --rm --net=xnet -v $PWD:/gh -w /gh xubuntu /bin/bash

# Debian
docker pull cn007b/debian
docker tag cn007b/debian xdebian
docker run -ti --rm --net=xnet -v $PWD:/gh -w /gh xdebian /bin/bash

# Alpine
docker run -ti --rm -v $PWD:/gh alpine:3.7 sh
