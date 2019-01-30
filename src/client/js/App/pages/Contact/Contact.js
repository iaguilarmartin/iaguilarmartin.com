import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';
import { mediaQueries } from 'ui/shared/breakpoints';
import Input from 'ui/components/Input';
import TextArea from 'ui/components/TextArea';
import Button from 'ui/components/Button';

import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import { sendContactEmail } from '../../api/client';

const ContactPage = styled(Page)`
  display: flex;
  flex-direction: column;

  ${mediaQueries.xl(css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `)}
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;

  ${mediaQueries.xl(css`
    width: 48%;
  `)}
`;

const Paragraph = styled.p`
  margin: ${space.x7} 0 ${space.x4};
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Label = styled.label`
  width: 50%;
  margin-bottom: ${space.x2};

  &:first-of-type {
    padding-right: ${space.x1};
  }

  &:last-of-type {
    padding-left: ${space.x1};
  }
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

class Contact extends Component {
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
      sendResult = 'Oooppps! Something failed, please try again after a while';
    }

    form.reset();
    this.setState({ sending: false, sendResult });
  };

  render() {
    const { sending, sendResult } = this.state;

    return (
      <ContactPage>
        <Section>
          <PageTitle>Contact me</PageTitle>
          <Paragraph>
            If you have any doubt about me or if you are interested on hiring me
            please drop me a line using the form below:
          </Paragraph>
          <Form ref={this.formRef} onSubmit={this.handleFormSubmit}>
            <Label>
              <Input
                placeholder="Name"
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
                placeholder="Email"
                name="email"
                type="email"
                minlength="1"
                maxlength="50"
                autocomplete="email"
                required
              />
            </Label>
            <TextArea
              placeholder="Message"
              name="body"
              minlength="1"
              maxlength="500"
              rows="7"
              required
            />
            <SendButton loading={sending}>
              {sending ? 'Sending' : 'Send'}
            </SendButton>
          </Form>
          <ResultMessage visible={sendResult}>
            {sendResult === SUCCESS_SEND_RESULT
              ? "Thank you for contacting me. I'll respond to you asap"
              : sendResult}
          </ResultMessage>
        </Section>
        <Section>sdfg</Section>
      </ContactPage>
    );
  }
}

export default Contact;
