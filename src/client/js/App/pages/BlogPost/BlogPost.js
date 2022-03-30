import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';

import { space, border } from 'ui/shared/spacing';
import fonts from 'ui/shared/fonts';
import colors from 'ui/shared/colors';

import { format } from '../../libs/dates';
import PageTitle from '../../components/PageTitle';
import Page from '../../components/Page';
import LanguageContext from '../../i18n/language-context';
import { translate } from '../../i18n';
import { findBlogPost } from '../../api/client';
import MarkdownRenderer from '../../components/MarkdownRenderer';

const BlogPostPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const PostDate = styled.h3`
  color: ${colors.greyLight};
  font-family: ${fonts.Obli};
  font-size: ${fonts.sizes.l};
  letter-spacing: 1px;
`;

const TagList = styled.section`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  margin: ${space.x2} 0;
`;

const Tag = styled.span`
  font-size: ${fonts.sizes.s};
  border: 1px solid ${colors.beige};
  color: ${colors.beige};
  border-radius: ${border.radius};
  padding: ${space.x025} ${space.x2};
  margin: ${space.x05};
`;

class BlogPost extends Component {
  state = {
    post: null,
    content: null
  };

  componentDidMount() {
    const {
      match: {
        params: { postId }
      }
    } = this.props;
    this.requestPost(postId);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { postId }
      }
    } = this.props;
    const {
      match: {
        params: { postId: prevPostId }
      }
    } = prevProps;

    if (postId !== prevPostId) {
      this.requestPost(postId);
    }
  }

  requestPost(postId) {
    const { language } = this.context;
    const post = findBlogPost(postId);
    this.setState({ post });

    if (post) {
      fetch(`/assets/posts/${post.id[language]}.md`)
        .then(response => response.text())
        .then(content => {
          this.setState({ content });
        });
    }
  }

  render() {
    const { post, content } = this.state;
    const { language } = this.context;

    if (!content) return null;

    return (
      <BlogPostPage>
        <PageTitle>{translate('blog_header_text')}</PageTitle>
        <MarkdownRenderer content={content} />
        <TagList>
          {post.tags.map(tag => (
            <Tag key={tag[language]}>{tag[language]}</Tag>
          ))}
        </TagList>
        <PostDate>
          {`// ${translate(
            'blog_published_on_text',
            format(new Date(post.publishedOn), 'D MMMM YYYY', language)
          )}`}
        </PostDate>
      </BlogPostPage>
    );
  }
}

BlogPost.contextType = LanguageContext;

BlogPost.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired
};

export default withRouter(BlogPost);
