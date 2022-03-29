import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { themed } from 'ui/shared/theme';
import Image from 'ui/components/Image';
import fonts from 'ui/shared/fonts';
import { space } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';
import Button from 'ui/components/Button';
import { mediaQueries } from 'ui/shared/breakpoints';

import { translate } from '../../../i18n';
import withLink from '../../../components/withLink';

const Article = styled.article`
  width: 100%;
`;

const Header = styled.h2`
  color: ${themed.articlesTitleColor};
  font-family: ${themed.articlesTitleFontFamily};
  text-transform: uppercase;
  line-height: 1.5;
  font-size: ${fonts.sizes.l};
  letter-spacing: 0.5px;
`;

const PostInfo = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: ${space.x15};

  ${mediaQueries.xl(css`
    flex-direction: row;
  `)}
`;

const PostImage = styled(Image)`
  width: 100%;
  margin-bottom: ${space.x2};

  ${mediaQueries.xl(css`
    margin-bottom: 0;
    margin-right: ${space.x2};
    width: 40%;
    height: 40%;
  `)}
`;

const PublicationDate = styled.span`
  font-size: ${fonts.sizes.l};
  font-family: ${fonts.Obli};
  color: ${colors.greyLight};
  display: block;
  margin-bottom: ${space.x1};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.p`
  line-height: 1.5;
`;

const StyledButton = styled(Button)`
  margin-top: ${space.x2};
  text-transform: uppercase;
  padding: ${space.x1} ${space.x25} !important;
  min-height: 30px !important;
  font-size: ${fonts.sizes.s} !important;
  align-self: center;

  ${mediaQueries.xl(css`
    align-self: flex-start;
  `)}
`;

const ReadMoreButton = withLink(StyledButton);

const BlogPost = ({ title, content, url, publicationDate, image }) => (
  <Article>
    <Header>{title}</Header>
    <PostInfo>
      {image && <PostImage src={image} alt="" />}
      <Container>
        <PublicationDate>{publicationDate}</PublicationDate>
        <Content>{content}</Content>
        <ReadMoreButton url={url}>
          {translate('blog_more_button_text')}
        </ReadMoreButton>
      </Container>
    </PostInfo>
  </Article>
);

BlogPost.defaultProps = {
  image: null
};

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default BlogPost;
