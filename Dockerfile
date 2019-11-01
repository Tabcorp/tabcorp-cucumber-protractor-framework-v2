ARG NODE
FROM node:${NODE}
WORKDIR /usr/src/app/

ENV DISPLAY :99

ENV npm_config_loglevel error

COPY ./ ./

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install jq
RUN apt-get -y install net-tools

RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update && apt-get install -y xvfb google-chrome-stable \
    && apt-get clean

#### ADD NVM & update path####
#### path updates are necessary so go agent and the process launching the agent both have access to the PATH ###
RUN npm config set user 0 && npm config set unsafe-perm true
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

RUN export NVM_DIR="$HOME/.nvm"

RUN ln -s /var/go/.nvm/versions/node/v8.12.0/bin/* /usr/local/bin/

RUN npm install -g karma gulp node-sass bower --loglevel error
RUN npm install --loglevel error
RUN npm install -g typescript
RUN ./node_modules/protractor/bin/webdriver-manager update
COPY bower.json compile_webparts.sh ./
RUN chmod +x compile_webparts.sh
RUN yes | bower install --allow-root
RUN yes | bower update web-parts --allow-root

RUN git clone --depth 1 -b master https://debea6c4e7b1ebeb11a3ffefe6a483d99453cbcc:x-oauth-basic@github.tabcorp.com.au/TabDigital/keno-mock-server.git
WORKDIR /usr/src/app/keno-mock-server
RUN npm install --loglevel error
WORKDIR /usr/src/app/

RUN ./compile_webparts.sh

