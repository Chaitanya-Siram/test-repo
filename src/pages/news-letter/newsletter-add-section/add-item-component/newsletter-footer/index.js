import React, { useEffect, useState } from 'react';
import {
  FooterContainerWrp,
  FooterContentWrp,
  FooterUnSubWrp,
} from './index.sc';
import Proptypes from 'prop-types';
import { footerText } from '../../..';

const NewsletterFooter = ({ setNewsLetterData, newsLetterData }) => {
  const [footText, setFooterText] = useState(footerText);
  useEffect(() => {
    setFooterText(newsLetterData?.footer);
  }, [newsLetterData?.footer]);
  return (
    <FooterContainerWrp>
      <FooterContentWrp
        rows={10}
        onChange={(e) => {
          setFooterText(e.target.value);
          setNewsLetterData((prev) => ({ ...prev, footer: e.target.value }));
        }}
        value={footText}
      >
        {footText}
      </FooterContentWrp>
      {/* <FooterUnSubWrp>
        If you no longer wish to receive these emails, please update your
        preferences or <u style={{ cursor: 'pointer' }}>unsubscribe</u>.
      </FooterUnSubWrp>
      <FooterUnSubWrp>Privacy policy • Contact us</FooterUnSubWrp> */}
    </FooterContainerWrp>
  );
};

NewsletterFooter.propTypes = {
  setNewsLetterData: Proptypes.func,
  newsLetterData: Proptypes.any,
};

export default NewsletterFooter;
