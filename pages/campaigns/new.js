import React, {Component} from 'react';
import { Form, Button, Input, Label, Message, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';

export default class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    successMessage: '',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();
    
    this.setState({loading: true, errorMessage: ''})
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await factory
        .methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        })
      this.setState({successMessage: campaign})
    } catch (error) {
      this.setState({
        errorMessage: error.message
      })
    }
    this.setState({loading: false})
  }

  render() {
    return (
      <Layout>
        <h3>Create A Campaign</h3>
        <Form 
          onSubmit={this.onSubmit} 
          error={!!this.state.errorMessage} 
          success={!!this.state.successMessage}
          loading={this.state.loading}
        >
          <Form.Field>
            <Label color="olive">Minimum Contribution</Label>
              <Input 
                value={this.state.minimumContribution}
                onChange={event => this.setState({minimumContribution: event.target.value})}
                label="wei" 
                labelPosition="right" 
              />
          </Form.Field>
          <Message error header="Oops!" floating content={this.state.errorMessage}/>
          <Message success header="Success!" content="Click Here To Take A Look!" floating/>
          <Button
            animated="fade" 
            positive 
            type="submit" 
            floated="right"
          >
            <Button.Content visible>
              Submit
            </Button.Content>
            <Button.Content hidden>
              <Icon name="check"/>
            </Button.Content>
          </Button>
        </Form>
        <Link route="/">
          <Button 
            animated="fade"
            secondary
            floated="left"
          >
            <Button.Content visible>
              Back
            </Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </Link>
      </Layout>
    )
  }
}

