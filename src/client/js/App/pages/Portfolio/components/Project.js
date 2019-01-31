import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Image from 'ui/components/Image';
import Button from 'ui/components/Button';
import { mediaQueries } from 'ui/shared/breakpoints';
import fonts from 'ui/shared/fonts';
import { space, border } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';
import { themed } from 'ui/shared/theme';

import { translate } from '../../../i18n';
import withLink from '../../../components/withLink';

const ProjectInfo = styled.section`
  display: flex;
  flex-direction: column;
  margin: ${space.x2} ${space.x1};
  transition: opacity 0.3s ease-out;
  position: relative;

  ${mediaQueries.xl(css`
    align-items: center;
    opacity: 0;
    position: absolute;
    background-color: rgba(50, 51, 50, 0.95);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: ${space.x25};
    margin: 0;
    border: 1px solid transparent;
  `)}
`;

const Container = styled.article`
  position: relative;
  outline: none;

  ${mediaQueries.xl(css`
    &:focus,
    &:hover {
      ${ProjectInfo} {
        opacity: 1;
        border: 1px solid ${colors.petrol};
      }
    }
  `)}
`;

const Title = styled.h2`
  font-family: ${fonts.ArchivoBlack};
  font-size: ${fonts.sizes.m};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-right: 80px;
  margin-bottom: ${space.x05};

  ${mediaQueries.xl(css`
    margin-right: 0;
    font-size: ${fonts.sizes.l};
    text-align: center;
  `)}
`;

const Categories = styled.h3`
  font-size: ${fonts.sizes.xs};
  font-family: ${fonts.Obli};
  text-transform: uppercase;
  color: ${themed.secondaryColor};

  ${mediaQueries.xl(css`
    font-size: ${fonts.sizes.m};
  `)}
`;

const TechnologiesList = styled.section`
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: ${space.x2} ${space.x05} 0;

  ${mediaQueries.xl(css`
    margin-top: 0;
  `)}
`;

const Technology = styled.span`
  font-size: ${fonts.sizes.s};
  border: 1px solid ${colors.beige};
  color: ${colors.beige};
  border-radius: ${border.radius};
  padding: ${space.x025} ${space.x2};
  margin: ${space.x05};
`;

const StyledButton = styled(Button)`
  text-transform: uppercase;
  font-size: ${fonts.sizes.s} !important;
  padding: ${space.x1} ${space.x25} !important;
  min-height: 30px !important;
  position: absolute;
  right: 0;
  top: 0;

  ${mediaQueries.xl(css`
    position: relative;
  `)}
`;

const MoreButton = withLink(StyledButton);

const formatCategories = categories =>
  categories
    .map(category => translate(`portfolio_categories_${category}`))
    .join(' - ');

const Project = ({ id, image, name, categories, technologies }) => (
  <Container tabIndex="0">
    <Image width="100%" alt={name} src={image} />
    <ProjectInfo>
      <Title>{name}</Title>
      <Categories>{formatCategories(categories)}</Categories>
      <TechnologiesList>
        {technologies.map(technology => (
          <Technology key={technology}>{technology}</Technology>
        ))}
      </TechnologiesList>
      <MoreButton url={`/portfolio/${id}`}>
        {translate('portfolio_more_button_text')}
      </MoreButton>
    </ProjectInfo>
  </Container>
);

Project.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Project;
