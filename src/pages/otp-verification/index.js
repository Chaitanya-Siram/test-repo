import React from 'react';
import { Img } from '../../assets/img';
import { useNavigate, useSearchParams } from 'react-router-dom/dist';
import {
  OTPAcceptTCWrp,
  OTPAlphaIcon,
  OTPCreatePasswordWrp,
  OTPInputField,
  OTPInputFieldTitle,
  OTPInputFieldWrp,
  OTPLeftContainer,
  OTPRightContainer,
  OTPSubmitButton,
  OTPTitleDescpSec,
  OTPTitleWrp,
  OTPTotalWrp,
} from './index.sc';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    if (searchParams.get('email')) {
      setEmail(searchParams.get('email'));
    } else {
      navigate('/');
    }
  }, []);

  return (
    <>
      <OTPCreatePasswordWrp>
        <OTPTotalWrp>
          <OTPLeftContainer>Build Analytics with intelligence</OTPLeftContainer>
          <OTPRightContainer>
            <OTPAlphaIcon src={Img.DarkLogo} />
            <OTPTitleWrp>OTP Verification</OTPTitleWrp>
            <OTPTitleDescpSec>
              Please input the 6 digit OTP sent to <b>{email}</b>
            </OTPTitleDescpSec>
            <OTPInputFieldWrp>
              <OTPInputFieldTitle>Enter OTP</OTPInputFieldTitle>
              <OTPInputField type="number" pattern="\d{6}" />
            </OTPInputFieldWrp>
            <OTPAcceptTCWrp>
              <OTPInputFieldTitle>OTP Expires in 10:00</OTPInputFieldTitle>
            </OTPAcceptTCWrp>
            <OTPSubmitButton>Submit</OTPSubmitButton>
          </OTPRightContainer>
        </OTPTotalWrp>
      </OTPCreatePasswordWrp>
    </>
  );
};

export default OTPVerification;
