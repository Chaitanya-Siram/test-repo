import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DashboardPopup from '../dasboard-popup';
import TermsAndConditions from '../terms-and-conditions-privacy-policy';
import ContactUs from '../contact-us';

const FooterLinkMainWrp = styled.div`
  width: 100vw;
  height: 4%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 0rem 1.5rem;
  background-color: #ffffff;
  z-index: 10;
`;

const FooterLinkWrp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: static;
  z-index: 100;

  background-color: #ffff;
`;
// const FooterDivider = styled.div`
//   border: 1px solid ${({ theme }) => theme.text};
//   height: 50%;
// `;
const FooterLink = styled(Link)`
  text-decoration: none;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.text};
`;

const AppFooter = () => {
  const [newCanvasPop, setNewCanvasPop] = useState(false);
  const updateParentState = (newValue) => {
    setNewCanvasPop(newValue);
  };
  const [newCanvasPopTerm, setNewCanvasPopTerm] = useState(false);
  const updateParentStateTerm = (newValue) => {
    setNewCanvasPopTerm(newValue);
  };

  const [newCanvasPopCont, setNewCanvasPopCont] = useState(false);
  const updateParentStateCont = (newValue) => {
    setNewCanvasPopCont(newValue);
  };
  return (
    <FooterLinkMainWrp>
      <FooterLinkWrp>
        <FooterLink
          onClick={(e) => {
            e.preventDefault();
            setNewCanvasPop(true);
          }}
        >
          Privacy Policy
        </FooterLink>
        <FooterLink
          onClick={(e) => {
            e.preventDefault();
            setNewCanvasPopTerm(true);
          }}
        >
          Terms & Conditions
        </FooterLink>
        {/* <FooterDivider /> */}
        <FooterLink
          onClick={(e) => {
            e.preventDefault();
            setNewCanvasPopCont(true);
          }}
        >
          Contact US
        </FooterLink>
        {/* <FooterDivider /> */}
      </FooterLinkWrp>
      <FooterLinkWrp>
        <p style={{ fontSize: '0.65rem' }}>
          AlphametricX © 2023 . All rights reserved
        </p>
        <DashboardPopup
          open={newCanvasPop}
          toggler={setNewCanvasPop}
          popContent={
            <TermsAndConditions
              toggler={setNewCanvasPop}
              updateParentState={updateParentState}
              heading={'Privacy Policy'}
            />
          }
          padding="0"
          Cross={false}
          borderRadius="0.75rem"
          width={'auto'}
        ></DashboardPopup>
        <DashboardPopup
          open={newCanvasPopTerm}
          toggler={setNewCanvasPopTerm}
          popContent={
            <TermsAndConditions
              toggler={setNewCanvasPopTerm}
              updateParentState={updateParentStateTerm}
              heading={'Terms And Conditions'}
            />
          }
          padding="0"
          Cross={false}
          borderRadius="0.75rem"
          width={'auto'}
        ></DashboardPopup>
        <DashboardPopup
          open={newCanvasPopCont}
          toggler={setNewCanvasPopCont}
          popContent={
            <ContactUs
              toggler={setNewCanvasPopCont}
              updateParentStateCont={updateParentStateCont}
            />
          }
          padding="0"
          Cross={false}
          borderRadius="0.75rem"
          width={'auto'}
        ></DashboardPopup>
      </FooterLinkWrp>
    </FooterLinkMainWrp>
  );
};

export default AppFooter;
