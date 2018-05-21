import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as ADPagination, Button } from 'antd-mobile/lib';
import { Text } from 'react-native';

export default class Pagination extends React.Component {
  static propTypes = {
    totalPages: PropTypes.number,
    handlePageChange: PropTypes.func,
    pagination: PropTypes.string,
    loadMoreText: PropTypes.string,
    hasNextPage: PropTypes.bool
  };

  state = { pageNumber: 1 };

  onPageChange = pageNumber => {
    const { pagination, handlePageChange } = this.props;
    this.setState({ pageNumber: pageNumber }, handlePageChange(pagination, pageNumber));
  };

  onPressLoadMore = () => {
    this.props.handlePageChange(this.props.pagination, null);
  };

  render() {
    const { pageNumber } = this.state;
    const { totalPages, pagination, hasNextPage, loadMoreText } = this.props;
    if (pagination === 'standard') {
      return (
        <ADPagination
          total={totalPages}
          current={pageNumber}
          locale={{ prevText: '<', nextText: '>' }}
          onChange={pageNumber => this.onPageChange(pageNumber)}
        />
      );
    } else {
      return hasNextPage ? (
        <Button type="primary" onClick={this.onPressLoadMore}>
          <Text>{loadMoreText}</Text>
        </Button>
      ) : null;
    }
  }
}