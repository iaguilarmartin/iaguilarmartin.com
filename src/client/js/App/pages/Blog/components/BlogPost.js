import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { themed } from 'ui/shared/theme';
import Image from 'ui/components/Image';
import fonts from 'ui/shared/fonts';
import { space } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';

import { translate } from '../../../i18n';
import Button from 'ui/components/Button';

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
  margin-top: ${space.x15};
`;

const PostImage = styled(Image)`
  width: 35%;
  height: 35%;
  margin-right: ${space.x2};
`;

const PublicationDate = styled.span`
  font-family: ${fonts.Obli};
  color: ${colors.greyLight};
  display: block;
  margin-bottom: ${space.x05};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.p`
  line-height: 1.5;
`;

const ReadMoreButton = styled(Button)`
  align-self: center;
`;

const BlogPost = ({ title, content, url, publicationDate, image }) => (
  <Article>
    <Header>{title}</Header>
    <PostInfo>
      {image && <PostImage src={image} alt="" />}
      <Container>
        <PublicationDate>{publicationDate.toISOString()}</PublicationDate>
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
  publicationDate: PropTypes.objectOf(Date).isRequired,
  image: PropTypes.string
};

export default BlogPost;
