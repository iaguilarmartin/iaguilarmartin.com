import React from 'react';
import { ClassNames, css } from '@emotion/core';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import TextButton from 'ui/components/TextButton';
import theme from 'ui/shared/theme';
import fonts from 'ui/shared/fonts';
import { space } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';

import withLink from '../withLink';

const A = withLink(styled(TextButton)`
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

  ul,
  p,
  ol {
    line-height: 1.5;
    font-size: ${fonts.sizes.l};
    margin-bottom: ${space.x2};
  }

  ul {
    padding-left: ${space.x5};
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

const MarkdownRenderer = ({ content }) => (
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
          // eslint-disable-next-line react/prop-types
          a: ({ href, children }) => (
            <A blankOnExternal url={href}>
              {children}
            </A>
          ),
          // eslint-disable-next-line react/prop-types
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
);

MarkdownRenderer.propTypes = {
  content: PropTypes.string.isRequired
};

export default MarkdownRenderer;
