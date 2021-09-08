#!/bin/bash

docker build -t hm-web .

TAG=$(date +"%Y%m%d")

docker tag hm-web hongsonhm/hm-web:$TAG

docker push hongsonhm/hm-web:$TAG

