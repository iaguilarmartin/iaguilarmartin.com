import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { scrollToTop } from '../../utils/scroll';

import Pagination from './Pagination';

const getPageFromProps = props => {
  if (!props || !props.location) return 1;

  const strPage = queryString.parse(props.location.search).page;
  const page = parseInt(strPage, 10);
  // eslint-disable-next-line no-restricted-globals, eqeqeq
  return isNaN(page) || page != strPage ? 1 : page;
};

const withPagination = (WrappedComponent, itemsPerPage) =>
  class extends Component {
    static propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func.isRequired
      }).isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    };

    get currentPage() {
      return getPageFromProps(this.props);
    }

    handlePageChange = page => {
      const { history, location } = this.props;
      history.push(`${location.pathname}?page=${page}`);
      scrollToTop();
    };

    renderPagination = (totalItems, generateText) => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      return (
        <Pagination
          currentPage={this.currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
          text={generateText(this.currentPage, totalPages)}
        />
      );
    };

    render() {
      return (
        <WrappedComponent
          page={this.currentPage}
          renderPagination={this.renderPagination}
          {...this.props}
        />
      );
    }
  };

export default withPagination;
