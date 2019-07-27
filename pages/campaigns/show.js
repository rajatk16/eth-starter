import React, { Component } from 'react'
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import {Card, Button, Icon, Grid} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call()
    return {
      address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;
    
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The Manager created this campaign and can create requests to withdraw money',
        style: {overflowWrap: 'break-word'},
        color: 'green'
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute atleast this much wei to become an approver',
        color: 'olive'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw money from the contract',
        color: 'yellow'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have already donated to this campaign',
        color: "orange"
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much money this campaign has',
        color: "red"
      }
    ]
    return <Card.Group items={items} />
  }


  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={5}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <Button
                  animated="fade"
                  basic
                  positive
                  as="a"
                >
                  <Button.Content visible>
                    View Requests
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="info"/>
                  </Button.Content>
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow;