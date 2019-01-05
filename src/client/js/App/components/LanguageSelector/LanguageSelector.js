import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import TextButton from 'ui/components/TextButton';
import { space } from 'ui/shared/spacing';
import fonts from 'ui/shared/fonts';
import { mediaQueries } from 'ui/shared/breakpoints';
import DotsList from 'ui/components/DotsList';

const Container = styled.section`
  display: flex;
  position: absolute;
  top: ${space.x2};
  right: ${space.x2};

  ${mediaQueries.md(`
    top: ${space.x3};
    right: ${space.x3};
  `)}
`;

const Language = styled(TextButton)`
  font-size: ${fonts.sizes.xl};
  font-family: ${fonts.AndaleMono};
  color: ${({ isActive, theme }) => (isActive ? theme.primaryColor : null)};

  ${mediaQueries.md(`
    font-size: ${fonts.sizes.l};
  `)}
`;

const LanguageSelector = ({
  languages,
  selectedLanguage,
  onSelectLanguage
}) => (
  <Container>
    <DotsList
      items={languages}
      keyProperty="name"
      renderItem={({ code }) => (
        <Language
          isActive={selectedLanguage === code}
          onClick={() => onSelectLanguage(code)}
        >
          {code.toUpperCase()}
        </Language>
      )}
    />
  </Container>
);

LanguageSelector.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  onSelectLanguage: PropTypes.func.isRequired
};

export default LanguageSelector;
