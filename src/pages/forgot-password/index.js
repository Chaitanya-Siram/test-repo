import React, { useState } from 'react';
import { Img } from '../../assets/img';
import { useNavigate } from 'react-router-dom/dist';
import {
  ForgotPasswordAlphaIcon,
  ForgotPasswordCreatePasswordWrp,
  ForgotPasswordInputField,
  ForgotPasswordInputFieldTitle,
  ForgotPasswordInputFieldWrp,
  ForgotPasswordLeftContainer,
  ForgotPasswordRightContainer,
  ForgotPasswordSubmitButton,
  ForgotPasswordTitleDescpSec,
  ForgotPasswordTitleWrp,
  ForgotPasswordTotalWrp,
} from './index.sc';
import { useDispatch } from 'react-redux';
import { forgotPasswordOTP } from '../../redux/slices/userSlice';
import { ValidateEmail } from '../login/validateEmail';
import { ErrorTxt } from '../login/index.sc';
import AppFooter from '../../components/app-footer';
import { forgot } from '../../constants';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [btnTxt, setBtnTxt] = useState('Continue');
  const [disableButton, setDisabledbutton] = useState(false);

  const onClickContinue = async (e) => {
    e.preventDefault();
    if (disableButton) {
      return null;
    }
    setDisabledbutton(true);
    setBtnTxt('Please Wait...');
    setErrorMessage('');
    try {
      if (!email) {
        setErrorMessage(
          'Email ID is mandatory to be entered. Please enter the email ID.'
        );
        return;
      } else if (!ValidateEmail(email)) {
        setErrorMessage('Enter valid Email ID');
        return;
      }
      const data = await dispatch(forgotPasswordOTP({ email }));
      if (data?.type === 'user/forgotPasswordOTP/fulfilled') {
        navigate('/otp-verification-login', {
          state: {
            email,
            otpType: forgot,
          },
        });
      } else {
        setErrorMessage(
          data?.payload ? data?.payload : 'Error while sending OTP'
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnTxt('Continue');
      setDisabledbutton(false);
    }
  };

  return (
    <>
      <ForgotPasswordCreatePasswordWrp>
        <ForgotPasswordTotalWrp>
          <ForgotPasswordLeftContainer>
            Build Analytics with intelligence
          </ForgotPasswordLeftContainer>
          <ForgotPasswordRightContainer onSubmit={onClickContinue}>
            <ForgotPasswordAlphaIcon src={Img.DarkLogo} />
            <ForgotPasswordTitleWrp>Forgot Password?</ForgotPasswordTitleWrp>
            <ForgotPasswordTitleDescpSec>
              No worries, please enter the email id registered with your
              Alphametricx account.
            </ForgotPasswordTitleDescpSec>
            <ForgotPasswordInputFieldWrp>
              <ForgotPasswordInputFieldTitle>
                Registered Email
              </ForgotPasswordInputFieldTitle>
              <ForgotPasswordInputField
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage && <ErrorTxt>{errorMessage}</ErrorTxt>}
            </ForgotPasswordInputFieldWrp>

            <ForgotPasswordSubmitButton type="submit">
              {btnTxt}
            </ForgotPasswordSubmitButton>
          </ForgotPasswordRightContainer>
        </ForgotPasswordTotalWrp>
      </ForgotPasswordCreatePasswordWrp>
      <AppFooter />
    </>
  );
};

export default ForgotPassword;
