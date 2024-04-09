import React from 'react';
import { FooterLink, FooterLinkMainWrp, FooterLinkWrp } from './index.sc';

const PdfFooter = (props) => {
  return (
    <FooterLinkMainWrp>
      <FooterLinkWrp>
        <FooterLink to={'/terms-and-conditions'}>Privacy Policy</FooterLink>
        <FooterLink to={'/terms-and-conditions'}>Terms & Conditions</FooterLink>
        {/* <FooterDivider /> */}
        <FooterLink to={'/contact-us'}>Contact US</FooterLink>
        {/* <FooterDivider /> */}
      </FooterLinkWrp>
      <FooterLinkWrp>
        <FooterLink>AlphametricX © 2023 . All rights reserved</FooterLink>
      </FooterLinkWrp>
    </FooterLinkMainWrp>
  );
};

PdfFooter.propTypes = {};

export default PdfFooter;
