rm -rf v2-automation-react-app
git clone --depth 1 -b master git@github.com:Tabcorp/v2-automation-react-app.git
cd ./v2-automation-react-app
source ~/.nvm/nvm.sh && nvm use
npm install --loglevel error
cd ..
./scripts/run-e2e.sh
