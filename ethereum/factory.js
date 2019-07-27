import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8c2700131a641cdC1e298b4735A64C5A34CC8574'
)

export default instance;