import React, { Component } from 'react'
import { Form, Input, Button, Icon, Label, Grid, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from "../routes";

export default class ContributeForm extends Component {
  state = {
    value: '',
    loading: false,
    errorMessage: ''
  }

  onSubmit = async (event) => {
    event.preventDefault();
    
    const campaign = Campaign(this.props.address);
    this.setState({loading: true, errorMessage: ''});

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contributes().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (error) {
      console.log(error);
      this.setState({errorMessage: error.message})
    }
    this.setState({loading: false, value: ''});
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} loading={this.state.loading} error={!!this.state.errorMessage}>
        <Form.Field>
          <Label>Amount to Contribute</Label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            label="ether"
            labelPosition="right"
            />
          <Button style={{marginTop: "15px"}} type="submit" basic positive animated="fade">
            <Button.Content visible>
              Contribute
            </Button.Content>
            <Button.Content hidden>
              <Icon name="ethereum"/>
            </Button.Content>
          </Button>
        </Form.Field>
        <Message error header="Ooops!" content={this.state.errorMessage} />
      </Form>
    )
  }
}