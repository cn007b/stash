Container Registry
-

[doc](https://cloud.google.com/container-registry/docs/quickstart)
[console](https://console.cloud.google.com/gcr/)

````sh
gcloud auth login

# init
gcloud auth configure-docker

# build & check
docker build -t cn007b/ubuntu-gcloud https://raw.githubusercontent.com/cn007b/docker-ubuntu/master/docker/17.10/Dockerfile
docker run -ti --rm cn007b/ubuntu-gcloud echo "OK"

# push
docker tag cn007b/ubuntu-gcloud gcr.io/c-dev/k-test:latest
docker push gcr.io/c-dev/k-test:latest
# open
open http://gcr.io/c-dev/k-test

# pull
docker pull gcr.io/c-dev/k-test:latest
````
