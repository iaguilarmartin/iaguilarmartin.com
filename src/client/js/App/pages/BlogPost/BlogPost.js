import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ClassNames, css } from '@emotion/core';
import { withRouter } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { space, border } from 'ui/shared/spacing';
import theme from 'ui/shared/theme';
import fonts from 'ui/shared/fonts';
import colors from 'ui/shared/colors';
import TextButton from 'ui/components/TextButton';

import PageTitle from '../../components/PageTitle';
import Page from '../../components/Page';
import LanguageContext from '../../i18n/language-context';
import { translate } from '../../i18n';
import { findBlogPost } from '../../api/client';
import withLink from '../../components/withLink';

const BlogPostPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const PostLink = withLink(styled(TextButton)`
  text-decoration: none;
`);

const blogStyle = css`
  h2 {
    color: ${theme.articlesTitleColor};
    font-family: ${theme.articlesTitleFontFamily};
    font-size: ${fonts.sizes.xxxl};
    letter-spacing: 0.5px;
    margin: ${space.x4} 0;
  }

  h3 {
    font-family: ${fonts.AndaleMono};
    font-size: ${fonts.sizes.xl};
    color: ${colors.greyLight};
    text-transform: uppercase;
    margin: ${space.x3} 0;
  }

  h4 {
    color: ${colors.beige};
    font-size: ${fonts.sizes.l};
    font-family: ${fonts.ArchivoBlack};
    margin: ${space.x25} 0;
  }

  p {
    line-height: 1.5;
    font-size: ${fonts.sizes.l};
    margin-bottom: ${space.x2};
  }

  strong {
    color: ${colors.beige};
  }

  code {
    color: ${colors.codeText};
    background-color: ${colors.codeBackground};
  }

  img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
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
        <ClassNames>
          {({ css: innerCss }) => (
            <ReactMarkdown
              className={innerCss`${blogStyle}`}
              components={{
                h1: 'h2',
                h2: 'h3',
                h3: 'h4',
                h4: 'h5',
                h5: 'h6',
                h6: 'h7',
                a: ({ href, children }) => (
                  <PostLink blankOnExternal url={href}>
                    {children}
                  </PostLink>
                ),
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={a11yDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </ClassNames>
        <TagList>
          {post.tags.map(tag => (
            <Tag key={tag[language]}>{tag[language]}</Tag>
          ))}
        </TagList>
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
