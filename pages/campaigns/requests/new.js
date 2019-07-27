import React, { Component } from 'react';
import {Form, Button, Message, Label, Input, Icon} from 'semantic-ui-react'
import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import {Link, Router} from '../../../routes';

export default class RequestNew extends Component {
  static async getInitialProps(props) {
    const {address} = props.query;
    return {address};
  }

  state= {
    description: '',
    amount: '',
    recipient: '',
    loading: false,
    errorMessage: '',
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({
      loading: true,
      errorMessage: ''
    })
    const campaign = Campaign(this.props.address);
    const {description, amount, recipient} = this.state;
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description, 
        web3.utils.toWei(amount, 'ether'), 
        recipient
      )
      .send({
        from: accounts[0]
      })
      Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (error) {
      console.log(error);
      this.setState({errorMessage: error.message})
    }
    this.setState({loading: false});
  }


  render() {
    return (
      <Layout>
        <h3>New Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} loading={this.state.loading}>
        <Message error header="Oops!" content={this.state.errorMessage} /> 
          <Form.Field>
            <Label 
              content="Description" 
              color="green" 
              detail="of the Request"
              ribbon
              size="large"
            />
            <Input
              value={this.state.description}
              onChange={event => this.setState({description: event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <Label 
              content="Amount" 
              color="green" 
              detail="in Ether"
              ribbon
              size="large"
            />
            <Input
              type="Number"
              value={this.state.amount}
              onChange={event => {this.setState({amount: event.target.value})}}
            />
          </Form.Field>
          <Form.Field>
            <Label 
              content="Recipient" 
              color="green" 
              detail="Address"
              ribbon
              size="large"
            />
            <Input
              value={this.state.address}
              onChange={event => {this.setState({recipient: event.target.value})}}
            />
          </Form.Field>
            <Button type="submit" animated basic positive floated="right">
              <Button.Content visible>
                Create
              </Button.Content>
              <Button.Content hidden>
                <Icon name="check"/>
              </Button.Content>
            </Button>
          </Form>
        <Link route="./">
        <Button animated basic negative floated="left">
          <Button.Content visible>
            Back
          </Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left"/>
          </Button.Content>
        </Button>
        </Link>
      </Layout>
    )
  }
}
