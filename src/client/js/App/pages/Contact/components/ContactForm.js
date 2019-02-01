import React, { Component } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { mediaQueries } from 'ui/shared/breakpoints';
import { space } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';
import Input from 'ui/components/Input';
import TextArea from 'ui/components/TextArea';
import Button from 'ui/components/Button';

import { translate } from '../../../i18n';
import { sendContactEmail } from '../../../api/client';

const inputsStyle = singleLine => css`
  width: ${singleLine ? '50%' : '100%'};

  &:first-of-type {
    padding-right: ${singleLine ? space.x1 : 0};
  }

  &:last-of-type {
    padding-left: ${singleLine ? space.x1 : 0};
  }
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Label = styled.label`
  ${inputsStyle(false)};
  margin-bottom: ${space.x2};

  ${mediaQueries.md(css`
    ${inputsStyle(true)};
  `)}

  ${mediaQueries.lg(css`
    @media screen and (orientation: landscape) {
      ${inputsStyle(false)};
    }
  `)}

  ${mediaQueries.xl(css`
    ${inputsStyle(true)};
  `)}
`;

const SendButton = styled(Button)`
  margin-top: ${space.x25};
`;

const ResultMessage = styled.p`
  margin-top: ${space.x3};
  text-align: center;
  color: ${colors.beige};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease-out;
`;

const SUCCESS_SEND_RESULT = 'OK';

class ContactForm extends Component {
  state = {
    sending: false,
    sendResult: ''
  };

  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    this.setState({ sending: true });

    const form = this.formRef.current;
    const values = Array.from(form.elements).reduce((result, element) => {
      const { name, value } = element;
      if (name && value) {
        return {
          ...result,
          [name]: value
        };
      }

      return result;
    }, {});

    let sendResult;

    try {
      const response = await sendContactEmail(values);
      if (response.status !== 'success') throw new Error('Invalid response');
      sendResult = SUCCESS_SEND_RESULT;
    } catch (err) {
      sendResult = translate('contact_form_error_text');
    }

    form.reset();
    this.setState({ sending: false, sendResult });
  };

  render() {
    const { sending, sendResult } = this.state;

    return (
      <>
        <Form ref={this.formRef} onSubmit={this.handleFormSubmit}>
          <Label>
            <Input
              placeholder={translate('contact_name_input_placeholder')}
              name="name"
              type="text"
              minlength="1"
              maxlength="150"
              autocomplete="name"
              required
            />
          </Label>
          <Label>
            <Input
              placeholder={translate('contact_email_input_placeholder')}
              name="email"
              type="email"
              minlength="1"
              maxlength="50"
              autocomplete="email"
              required
            />
          </Label>
          <TextArea
            placeholder={translate('contact_message_input_placeholder')}
            name="body"
            minlength="1"
            maxlength="500"
            rows="7"
            required
          />
          <SendButton loading={sending}>
            {sending
              ? translate('contact_send_button_loading_text')
              : translate('contact_send_button_text')}
          </SendButton>
        </Form>
        <ResultMessage visible={sendResult}>
          {sendResult === SUCCESS_SEND_RESULT
            ? translate('contact_form_success_text')
            : sendResult}
        </ResultMessage>
      </>
    );
  }
}

export default ContactForm;
