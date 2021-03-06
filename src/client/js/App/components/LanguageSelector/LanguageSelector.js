import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import TextButton from 'ui/components/TextButton';
import { space } from 'ui/shared/spacing';
import fonts from 'ui/shared/fonts';
import { mediaQueries } from 'ui/shared/breakpoints';
import DotsList from 'ui/components/DotsList';

import LanguageContext from '../../i18n/language-context';

const Container = styled.section`
  display: flex;
  position: absolute;
  top: ${space.x2};
  right: ${space.x2};

  ${mediaQueries.md(css`
    top: ${space.x3};
    right: ${space.x3};
  `)}
`;

const Language = styled(TextButton)`
  font-size: ${fonts.sizes.xl};
  font-family: ${fonts.AndaleMono};
  color: ${({ isActive, theme }) => (isActive ? theme.primaryColor : null)};

  ${mediaQueries.md(css`
    font-size: ${fonts.sizes.l};
  `)}
`;

const LanguageSelector = ({ languages, onSelectLanguage }) => (
  <LanguageContext.Consumer>
    {({ language }) => (
      <Container>
        <DotsList
          items={languages}
          keyProperty="name"
          renderItem={({ code }) => (
            <Language
              isActive={language === code}
              onClick={() => onSelectLanguage(code)}
            >
              {code.toUpperCase()}
            </Language>
          )}
        />
      </Container>
    )}
  </LanguageContext.Consumer>
);

LanguageSelector.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelectLanguage: PropTypes.func.isRequired
};

export default LanguageSelector;
