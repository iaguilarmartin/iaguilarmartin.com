import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  navigate,
  getQueryParamValue
} from '../../../client/js/App/libs/url-utils';

import Pagination from './Pagination';

export const PAGE_QUERY_PARAM = 'page';

const getPageFromProps = props => {
  if (!props || !props.location) return 1;

  const strPage = getQueryParamValue(props.location, PAGE_QUERY_PARAM);
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
      this.navigateToPage(page);
    };

    navigateToPage(page) {
      const { history, location } = this.props;
      navigate(location, history, { [PAGE_QUERY_PARAM]: page });
    }

    renderPagination = (totalItems, generateText) => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (totalPages > 0 && totalPages < this.currentPage) {
        this.navigateToPage(totalPages);
        return null;
      }

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
