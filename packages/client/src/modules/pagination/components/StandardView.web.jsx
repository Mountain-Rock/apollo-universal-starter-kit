import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from '../../common/components/web';
import translate from '../../../i18n';

const StandardView = ({ data, handlePageChange, t }) => {
  const renderFunc = text => <span>{text}</span>;
  const columns = [
    {
      title: t('list.column.title'),
      dataIndex: 'title',
      key: 'title',
      displayName: 'MyComponent',
      render: renderFunc
    }
  ];

  return (
    <div>
      <Table dataSource={data.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        displayedAmount={data.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={data.pageInfo.hasNextPage}
        pagination={'standard'}
        totalCount={data.totalCount}
        loadMoreText={t('list.btn.more')}
        itemsNumber={data.limit}
      />
    </div>
  );
};

StandardView.propTypes = {
  data: PropTypes.object,
  handlePageChange: PropTypes.func,
  t: PropTypes.func
};

export default translate('pagination')(StandardView);
