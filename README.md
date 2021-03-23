############THE DOCKERFILE IS THERE FOR FUN. THIS REPOS IS NOT DEPLOY_READY########
##################START################################
npm i
docker run -dp 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.17.0
node server.js https://localhost:4443 MY_SECRET
now in a different process run node serveFE.js
now visit https://localhost:5002 in your browser and login by {username: publisher1, pass: pass}
###################END##################################

[![License badge](https://img.shields.io/badge/license-Apache2-orange.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![Documentation Status](https://readthedocs.org/projects/openviduio-docs/badge/?version=stable)](https://docs.openvidu.io/en/stable/?badge=stable)
[![Docker badge](https://img.shields.io/docker/pulls/openvidu/openvidu-server-kms.svg)](https://hub.docker.com/r/openvidu/openvidu-server-kms)
[![Support badge](https://img.shields.io/badge/support-sof-yellowgreen.svg)](https://openvidu.discourse.group/)

[![][OpenViduLogo]](http://openvidu.io)

openvidu-js-node
===

Visit [docs.openvidu.io/en/stable/tutorials/openvidu-js-node/](http://docs.openvidu.io/en/stable/tutorials/openvidu-js-node/)

[OpenViduLogo]: https://secure.gravatar.com/avatar/5daba1d43042f2e4e85849733c8e5702?s=120