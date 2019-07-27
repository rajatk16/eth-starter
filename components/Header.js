import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default () => {
  return (
    <Menu style={{marginTop: '10px'}}>
      <Link route="/">
        <Menu.Item as="a">
            Eth-Starter
        </Menu.Item>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <Menu.Item as="a">
            Campaigns
          </Menu.Item>
        </Link>

        <Link route="/campaigns/new">
          <Menu.Item as="a">
            +
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}