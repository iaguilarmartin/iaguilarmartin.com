import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import Input from 'ui/components/Input';
import TextArea from 'ui/components/TextArea';
import Button from 'ui/components/Button';

import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';

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

const FieldSet = styled.fieldset`
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

const handleFormSubmit = e => {
  e.preventDefault();
};

class Contact extends Component {
  state = {
    sending: false,
    error: false
  };

  render() {
    return (
      <ContactPage>
        <Section>
          <PageTitle>Contact me</PageTitle>
          <Paragraph>
            If you have any doubt about me or if you are interested on hiring me
            please drop me a line using the form below:
          </Paragraph>
          <Form onSubmit={handleFormSubmit}>
            <FieldSet>
              <Input
                placeholder="Name"
                name="name"
                type="text"
                minlength="1"
                maxlength="150"
                autocomplete="name"
                required
              />
            </FieldSet>
            <FieldSet>
              <Input
                placeholder="Email"
                name="email"
                type="email"
                minlength="1"
                maxlength="50"
                autocomplete="email"
                required
              />
            </FieldSet>
            <TextArea
              placeholder="Message"
              name="body"
              minlength="1"
              maxlength="500"
              rows="7"
              required
            />
            <SendButton disabled>Send</SendButton>
          </Form>
        </Section>
        <Section>sdfg</Section>
      </ContactPage>
    );
  }
}

export default Contact;
