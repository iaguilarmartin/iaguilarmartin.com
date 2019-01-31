import React from 'react';
import styled from '@emotion/styled';

import TextButton from 'ui/components/TextButton';
import { space } from 'ui/shared/spacing';

import withLink from '../../../components/withLink';

import FacebookIcon from './icons/facebook';
import MailIcon from './icons/mail';
import LinkedinIcon from './icons/linkedin';
import TwitterIcon from './icons/twitter';
import GithubIcon from './icons/github';

const List = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;
`;

const ListItem = styled.li`
  margin-bottom: ${space.x25};
`;

const SocialButton = withLink(styled(TextButton)`
  display: flex;
  align-items: center;
  text-decoration: none;

  svg {
    margin-right: ${space.x2};
  }
`);

const SocialLinks = () => (
  <List>
    <ListItem>
      <SocialButton url="mailto:iaguilarmartin@outlook.com">
        <MailIcon />
        <span>iaguilarmartin@outlook.com</span>
      </SocialButton>
    </ListItem>
    <ListItem>
      <SocialButton
        url="https://www.facebook.com/ivan.aguilarmartin"
        target="_blank"
      >
        <FacebookIcon />
        <span>https://www.facebook.com/ivan.aguilarmartin</span>
      </SocialButton>
    </ListItem>
    <ListItem>
      <SocialButton
        url="https://linkedin.com/in/iaguilarmartin"
        target="_blank"
      >
        <LinkedinIcon />
        <span>https://linkedin.com/in/iaguilarmartin</span>
      </SocialButton>
    </ListItem>
    <ListItem>
      <SocialButton url="https://twitter.com/iaguilarmartin" target="_blank">
        <TwitterIcon />
        <span>https://twitter.com/iaguilarmartin</span>
      </SocialButton>
    </ListItem>
    <ListItem>
      <SocialButton url="https://github.com/iaguilarmartin" target="_blank">
        <GithubIcon />
        <span>https://github.com/iaguilarmartin</span>
      </SocialButton>
    </ListItem>
  </List>
);

export default SocialLinks;
