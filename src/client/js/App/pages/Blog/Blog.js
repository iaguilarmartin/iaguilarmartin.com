import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import { withPagination } from 'ui/components/Pagination';

import PageTitle from '../../components/PageTitle';
import Page from '../../components/Page';
import { format } from '../../libs/dates';
import LanguageContext from '../../i18n/language-context';
import { translate } from '../../i18n';
import { getBlogPosts } from '../../api/client';

import BlogPost from './components/BlogPost';

const BlogPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Posts = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: ${space.x4};
  flex-grow: 1;

  ${mediaQueries.lg(css`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  `)};
`;

const BlogPostWrapper = styled.div`
  margin: ${space.x4} 0 ${space.x2};

  ${mediaQueries.lg(css`
    width: 49%;
    margin-bottom: 0;
  `)}
`;

const ITEMS_PER_PAGE = 4;

class Blog extends Component {
  state = {
    posts: [],
    totalPosts: 0
  };

  componentDidMount() {
    this.requestPosts();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    const { page: prevPage } = prevProps;

    if (page !== prevPage) {
      this.requestPosts();
    }
  }

  requestPosts() {
    const { page } = this.props;

    const { posts, total } = getBlogPosts(
      (page - 1) * ITEMS_PER_PAGE,
      ITEMS_PER_PAGE
    );
    this.setState({ posts, totalPosts: total });
  }

  render() {
    const { posts, totalPosts } = this.state;
    const { renderPagination } = this.props;
    const { language } = this.context;

    return (
      <BlogPage>
        <PageTitle>{translate('blog_header_text')}</PageTitle>
        <Posts>
          {posts.map(({ id, title, content, publishedOn, image }) => (
            <BlogPostWrapper key={id[language]}>
              <BlogPost
                title={title[language]}
                content={content[language]}
                publicationDate={format(
                  new Date(publishedOn),
                  'D MMMM YYYY',
                  language
                )}
                image={image}
                url={`blog/${id[language]}`}
              />
            </BlogPostWrapper>
          ))}
        </Posts>
        {renderPagination(totalPosts, (currentPage, totalPages) =>
          translate('blog_pagination_text', currentPage, totalPages)
        )}
      </BlogPage>
    );
  }
}

Blog.contextType = LanguageContext;

Blog.propTypes = {
  page: PropTypes.number.isRequired,
  renderPagination: PropTypes.func.isRequired
};

export default withPagination(Blog, ITEMS_PER_PAGE);
