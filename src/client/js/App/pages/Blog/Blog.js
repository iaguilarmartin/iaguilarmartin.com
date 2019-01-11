import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import format from 'date-fns/format';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';

import PageTitle from '../../components/PageTitle';
import Page from '../../components/Page';

import { translate, getCurrentLanguage } from '../../i18n';
import blogPosts from '../../api/blog-posts.json';

import BlogPost from './components/BlogPost';

const Posts = styled.section`
  display: flex;
  flex-direction: column;

  ${mediaQueries.lg(css`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  `)}
`;

const BlogPostWrapper = styled.div`
  margin: ${space.x4} 0 ${space.x2};

  ${mediaQueries.lg(css`
    width: 49%;
    margin-bottom: 0;
  `)}
`;

const currentLanguage = getCurrentLanguage();
// eslint-disable-next-line import/no-dynamic-require
const locale = require(`date-fns/locale/${currentLanguage}`);

const Blog = () => (
  <Page>
    <PageTitle>{translate('blog_header_text')}</PageTitle>
    <Posts>
      {blogPosts.map(({ id, title, content, publishedOn, image, url }) => (
        <BlogPostWrapper key={id}>
          <BlogPost
            title={title[currentLanguage]}
            content={content[currentLanguage]}
            publicationDate={format(new Date(publishedOn), 'D MMMM YYYY', {
              locale
            })}
            image={image}
            url={url[currentLanguage]}
          />
        </BlogPostWrapper>
      ))}
    </Posts>
  </Page>
);

export default Blog;
