import React from 'react';
import PropTypes from 'prop-types';
import { withApollo, graphql } from 'react-apollo';
import ApolloClient from 'apollo-client';

import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';

import CURRENT_USER from '../graphql/current_user.graphql';

const logoutHelper = () => {
  document.cookie = 'x-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'x-refresh-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.localStorage.setItem('token', null);
  window.localStorage.setItem('refreshToken', null);
};

class AuthNav extends React.Component {

  constructor(props) {
    super(props);
  }

  logout = async () => {
    await logoutHelper();

    this.props.client.resetStore();

    //this.props.data.refetch();
  };

  render() {
    const { currentUser } = this.props.data;

    if (currentUser) {
      return (
        <NavItem onClick={this.logout}><Link to="/">Logout</Link></NavItem>
      );
    } else {
      return (
          <NavItem><Link to="/login">Login</Link></NavItem>
      );
    }
  }
}

AuthNav.propTypes = {
  client: PropTypes.instanceOf(ApolloClient),
  data: PropTypes.object,
};

export default withApollo(graphql(CURRENT_USER, {
  options: { fetchPolicy: 'network-only' },
  //props: ({ data: { loading, currentUser } }) => ({
  //  loading, currentUser,
  //}),
})(AuthNav));