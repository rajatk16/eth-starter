import React, {Component} from 'react';
import factory from '../ethereum/factory';
import { Card, Divider, Button, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {campaigns: campaigns.reverse()};
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <div>
            <Divider/>
            <Link route={`/campaigns/${address}`}>
              <a>View Campaign</a>
            </Link>
          </div>
        ),
        fluid: true,
      }
    });
    return <Card.Group items={items} />
  }

  render() {
    return (
      <div>
        <Layout>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <Button 
              animated="fade"
              positive
              floated="right"
            >
              <Button.Content visible>
                New Campaign
              </Button.Content>
              <Button.Content hidden> 
                <Icon name="add" />
              </Button.Content>
            </Button>
          </Link>
          {this.renderCampaigns()}
        </Layout>
      </div>
    )
  }
}

export default CampaignIndex;