import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';

import { space } from 'ui/shared/spacing';

import { formatURLFromLocation } from '../../libs/url-utils';
import PageTitle from '../../components/PageTitle';
import Page from '../../components/Page';
import LanguageContext from '../../i18n/language-context';
import { translate, setCurrentLanguage } from '../../i18n';
import MarkdownRenderer from '../../components/MarkdownRenderer';

import markdownEN from './receipt_printer_en.md';
import markdownES from './receipt_printer_es.md';

const languageFilesMap = {
  es: markdownES,
  en: markdownEN
};

const ReceiptPrinterPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Spacing = styled('br')`
  margin-bottom: ${space.x4};
  content: '';
`;

class ReceiptPrinter extends Component {
  componentDidMount() {
    const { location } = this.props;
    const { language } = this.context;
    if (location.pathname.includes('receiptprinter-es') && language !== 'es') {
      setCurrentLanguage('es');
      window.location.replace(formatURLFromLocation(location, 'es'));
    } else if (
      !location.pathname.includes('receiptprinter-es') &&
      language === 'es'
    ) {
      setCurrentLanguage('en');
      window.location.replace(formatURLFromLocation(location, 'en'));
    }
  }

  render() {
    const { language } = this.context;
    return (
      <ReceiptPrinterPage>
        <PageTitle>{translate('receipt_printer_header_text')}</PageTitle>
        <Spacing />
        <MarkdownRenderer content={languageFilesMap[language]} />
      </ReceiptPrinterPage>
    );
  }
}

ReceiptPrinter.contextType = LanguageContext;

ReceiptPrinter.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(ReceiptPrinter);
