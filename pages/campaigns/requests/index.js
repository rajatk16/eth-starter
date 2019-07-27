import React, { Component } from 'react';
import { Button, Icon, Table } from "semantic-ui-react";
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

export default class RequestIndex extends Component {
  static async getInitialProps(props) {
    const {address} = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
    );

    return {address, requests, requestCount, approversCount}
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      ); 
    });
  }
  renderTable() {
    const {Header, Row, HeaderCell, Body} = Table;
    if (this.props.requestCount > 0) {
      return (
        <Table celled striped>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount (ether)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
      )
    }
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <Button as="a" positive animated="fade" floated="right" style={{marginBottom: '20px'}}>
            <Button.Content visible>
              Add Request
            </Button.Content>
            <Button.Content hidden>
              <Icon name="add"/>
            </Button.Content>
          </Button>
        </Link>
        {this.renderTable()}
        <div style={{marginTop: '20px'}}>Found {this.props.requestCount} requests.</div>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <Button as="a" negative animated floated="left" style={{marginTop: '20px'}}>
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
