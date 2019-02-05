import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';

import colors from 'ui/shared/colors';
import { space } from 'ui/shared/spacing';
import fonts from 'ui/shared/fonts';

import TextButton from '../TextButton';

import CloseIcon from './CloseIcon';

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(21, 21, 21, 0.8);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const modalStyle = css`
  background-color: ${colors.blackMenu};
  width: 90%;
  max-width: 625px;
  outline: none;
  max-height: 90%;
  overflow: auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`;

const Header = styled.header`
  padding: ${space.x3};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.greyBgLines};
  text-transform: uppercase;
  font-family: ${fonts.ArchivoBlack};
  font-size: ${fonts.sizes.l};
`;

const Content = styled.article`
  padding: ${space.x3};
`;

ReactModal.setAppElement('#root');

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = 'initial';
};

const WorkDetails = ({ children, title, onClose, isOpen }) => (
  <ClassNames>
    {({ css: innerCss }) => (
      <ReactModal
        className={innerCss`${modalStyle}`}
        overlayClassName={innerCss`${overlayStyle}`}
        onAfterOpen={disableScroll}
        isOpen={isOpen}
      >
        <Header>
          {title}
          <TextButton
            color={colors.greyLight}
            onClick={() => {
              enableScroll();
              onClose();
            }}
          >
            <CloseIcon />
          </TextButton>
        </Header>
        <Content>{children}</Content>
      </ReactModal>
    )}
  </ClassNames>
);

WorkDetails.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default WorkDetails;
