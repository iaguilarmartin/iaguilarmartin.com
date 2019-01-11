import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';

import PageTitle from '../../components/PageTitle';
import Page from '../../components/Page';

import { translate, getCurrentLanguage } from '../../i18n';
import blogPosts from '../../api/blog-posts.json';

import BlogPost from './components/BlogPost';

const Posts = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BlogPostWrapper = styled.div`
  width: 49%;
  margin-top: ${space.x4};
`;

const currentLanguage = getCurrentLanguage();

const Blog = () => (
  <Page>
    <PageTitle>{translate('blog_header_text')}</PageTitle>
    <Posts>
      {blogPosts.map(({ id, title, content, publishedOn, image, url }) => (
        <BlogPostWrapper key={id}>
          <BlogPost
            title={title[currentLanguage]}
            content={content[currentLanguage]}
            publicationDate={new Date(publishedOn)}
            image={image}
            url={url[currentLanguage]}
          />
        </BlogPostWrapper>
      ))}
    </Posts>
  </Page>
);

export default Blog;
