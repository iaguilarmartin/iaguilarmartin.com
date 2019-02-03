import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { css, ClassNames } from '@emotion/core';
import { withRouter } from 'react-router';

import colors from 'ui/shared/colors';

import { getRoutePath } from '../../../components/Router';

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
  background-color: ${colors.greyBgLines};
  width: 90%;
  max-width: 625px;
  outline: none;
`;

ReactModal.setAppElement('#root');

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = 'initial';
};

const WorkDetails = ({ history }) => (
  <ClassNames>
    {({ css: innerCss }) => (
      <ReactModal
        className={innerCss`${modalStyle}`}
        overlayClassName={innerCss`${overlayStyle}`}
        onAfterOpen={disableScroll}
        isOpen
      >
        Pruebas
        <button
          type="button"
          onClick={() => {
            enableScroll();
            history.push(getRoutePath('resume'));
          }}
        >
          Close
        </button>
      </ReactModal>
    )}
  </ClassNames>
);

WorkDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(WorkDetails);
