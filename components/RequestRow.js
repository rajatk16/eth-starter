import React, { Component } from 'react'
import {Table, Button, Icon} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

export default class RequestRow extends Component {
  onApprove = async () => {
    const accounts = await web3.eth.getAccounts()
    const campaign = Campaign(this.props.address);
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    })
  }

  onFinalize = async () => {
    const accounts = await web3.eth.getAccounts()
    const campaign = Campaign(this.props.address);
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    })
  }

  render() {
    const {request, id, approversCount} = this.props;
    const {Row, Cell} = Table;
    const {description, value, recipient, approvalCount, complete} = request
    const amount = web3.utils.fromWei(value, 'ether');
    const readyToFinalize = approvalCount > approversCount / 2;

    return (
      <Row disabled={complete} positive={readyToFinalize && !complete}>
        <Cell>{id+1}</Cell>
        <Cell>{description}</Cell>
        <Cell>{amount}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{`${approvalCount} / ${approversCount}`}</Cell>
        <Cell>
          {complete ? null : (
            <Button primary animated onClick={this.onApprove}>
              <Button.Content visible>
                Approve
              </Button.Content>
              <Button.Content hidden>
                <Icon name="plus"/>
              </Button.Content>
            </Button> 
          )}
        </Cell>
        <Cell>
          {complete ? null : (
            <Button positive animated onClick={this.onFinalize}>
              <Button.Content visible>
                Finalize
              </Button.Content>
              <Button.Content hidden>
                <Icon name="check"/>
              </Button.Content>
            </Button>
          )}
        </Cell>
      </Row>
    )
  }
}
