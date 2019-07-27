const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'whip name return usage fury bean grape candy smoke enter ridge tongue',
  'https://rinkeby.infura.io/v3/76e1baaeb1924e6fbf3712df3a553a74'  
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
  .deploy({data: '0x' + compiledFactory.bytecode})
  .send({from: accounts[0]});
  console.log('Contract deployed to', result.options.address);
};
deploy();
provider.engine.stop();