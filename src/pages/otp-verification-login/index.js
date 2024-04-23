import React, { useState } from 'react';
import DarkLogo from '../../assets/img/bg/DarkLogo.svg';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import {
  OTPAcceptTCWrp,
  OTPAlphaIcon,
  OTPCreatePasswordWrp,
  OTPInputExpireTitle,
  OTPInputField,
  OTPInputFieldTitle,
  OTPInputFieldWrp,
  OTPLeftContainer,
  OTPRightContainer,
  OTPSubmitButton,
  OTPTitleDescpSec,
  OTPTitleWrp,
  OTPTotalWrp,
  ResendOTPButton,
  SuccessTxt,
} from './index.sc';
import { ErrorTxt } from '../login/index.sc';
import { useDispatch } from 'react-redux';
import {
  resendOTP,
  verifyCreatePasswordOTP,
  verifyOTP,
  otpVerifyForgot,
} from '../../redux/slices/userSlice';
import {
  loginTypeLogin,
  refreshKey,
  tokenKey,
  forgot,
  loginTypeCreatePassword,
  setAuthenticationTokens,
} from '../../constants';
import OtpTimer from './otpTimer';
import AppFooter from '../../components/app-footer';
import Cookies from 'js-cookie';

const OTPVerificationLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpErorMessage, setOTPErrorMessage] = React.useState(null);
  const [otpSuccessMessage, setOptSuccessMessage] = React.useState(null);
  const [btnTxt, setBtnTxt] = useState('Submit');
  const [resendOTPText, setResendOTPText] = useState('Resend OTP');
  const [otpType, setOTPType] = useState('');
  const [userId, setUserId] = useState('');
  const [disableButton, setDisabledbutton] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();
  console.log(location.state);

  React.useEffect(() => {
    const searchParams = location.state;
    if (searchParams?.email) {
      setEmail(searchParams?.email);
      setUserId(searchParams?.id);
    } else {
      navigate('/');
    }
    const otpType = searchParams?.otpType;
    if (otpType) {
      if (otpType === loginTypeLogin) {
        setRememberMe(searchParams?.rememberMe);
      }
      setOTPType(searchParams?.otpType);
    } else {
      navigate('/');
    }
    setOtp('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpType, userId]);

  const onSubmitOTP = async () => {
    setOTPErrorMessage(null);
    setOptSuccessMessage(null);
    setBtnTxt('Please Wait...');
    try {
      if (otp) {
        setOTPErrorMessage('');
        const data = await dispatch(
          verifyOTP({ otp_code: otp, email, should_remember: rememberMe })
        );
        if (data?.type === 'user/verifyOTP/rejected') {
          setOTPErrorMessage(data?.payload);
          setOtp('');
        } else if (data?.type === 'user/verifyOTP/fulfilled') {
          const { payload } = data;
          const tokenInfo = payload?.token;
          localStorage.setItem(tokenKey, tokenInfo?.access);
          localStorage.setItem(refreshKey, tokenInfo?.refresh);
          Cookies.set('x-device-uuid', payload['x-device-uuid'], {
            expires: 15,
          });
          window.location.reload();
        }
      } else {
        setOTPErrorMessage('OTP is required');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnTxt('Submit');
      setDisabledbutton(false);
    }
  };

  const onSubmitForgotOTP = async () => {
    setOTPErrorMessage(null);
    setOptSuccessMessage(null);
    setBtnTxt('Please Wait...');
    try {
      if (otp) {
        setOTPErrorMessage('');
        const data = await dispatch(otpVerifyForgot({ otp_code: otp, email }));
        if (data?.type === 'user/otpVerifyForgot/rejected') {
          setOTPErrorMessage(data?.payload);
          setOtp('');
        } else if (data?.type === 'user/otpVerifyForgot/fulfilled') {
          const { payload } = data;
          navigate(
            `/reset-password?email=${payload?.email}&first_name=${payload?.first_name}&token=${payload?.token?.access}`
          );
        }
      } else {
        setOTPErrorMessage('OTP is required');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnTxt('Submit');
      setDisabledbutton(false);
    }
  };

  const onCreateSubmitOTP = async (e) => {
    // debugger;
    setOTPErrorMessage(null);
    setOptSuccessMessage(null);
    setBtnTxt('Please Wait...');
    try {
      if (otp) {
        setOTPErrorMessage('');
        const data = await dispatch(
          verifyCreatePasswordOTP({ id: userId, otpNumber: otp })
        );
        if (data?.type === 'user/verifyCreatePasswordOTP/rejected') {
          setOTPErrorMessage(data?.payload);
          setOtp('');
        } else if (data?.type === 'user/verifyCreatePasswordOTP/fulfilled') {
          const { payload } = data;
          const tokenInfo = payload?.token;
          setAuthenticationTokens(tokenInfo);
          window.location = window.location.origin;
          // navigate('/');
        }
      } else {
        setOTPErrorMessage('OTP is required');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnTxt('Submit');
      setDisabledbutton(false);
    }
  };

  const onClickResendOTP = async () => {
    setResendOTPText('Sending OTP. Please Wait...');
    setOTPErrorMessage(null);
    setOptSuccessMessage(null);
    try {
      const data = await dispatch(
        resendOTP({
          email,
          otpType:
            otpType === loginTypeCreatePassword ? 'create_password' : otpType,
        })
      );
      if (data?.type === 'user/resendOTP/fulfilled') {
        setOtp('');
        setOptSuccessMessage('OTP is sent successfully');
        setResetTimer((bool) => !bool);
      } else {
        setOTPErrorMessage(
          typeof data?.payload === 'string'
            ? data?.payload
            : JSON.stringify(data?.payload)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setResendOTPText('Resend OTP');
    }
  };

  return (
    <>
      <OTPCreatePasswordWrp>
        <OTPTotalWrp>
          <OTPLeftContainer>Build Analytics with intelligence</OTPLeftContainer>
          <OTPRightContainer
            onSubmit={(e) => {
              console.log('calling sumbit fucntion');
              e.preventDefault();
              if (disableButton) {
                return null;
              } else {
                setDisabledbutton(true);
                if (otpType === loginTypeLogin) {
                  onSubmitOTP();
                } else if (otpType === forgot) {
                  onSubmitForgotOTP();
                } else {
                  onCreateSubmitOTP();
                }
              }
            }}
          >
            <OTPAlphaIcon src={DarkLogo} />
            <OTPTitleWrp>OTP Verification</OTPTitleWrp>
            <OTPTitleDescpSec>
              Please input the 6 digit OTP sent to{' '}
              <b style={{ color: '#000' }}>{email}</b>
            </OTPTitleDescpSec>
            <OTPInputFieldWrp>
              <OTPInputFieldTitle>Enter OTP</OTPInputFieldTitle>
              <OTPInputField
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value;
                  console.log(String(value).length);
                  if (/^[0-9]*$/.test(value) && String(value).length <= 6) {
                    setOtp(value);
                  }
                }}
              />
            </OTPInputFieldWrp>
            {otpErorMessage && (
              <ErrorTxt style={{ marginTop: '1em' }}>{otpErorMessage}</ErrorTxt>
            )}
            {otpSuccessMessage && <SuccessTxt>{otpSuccessMessage}</SuccessTxt>}
            <OTPAcceptTCWrp>
              <OTPInputExpireTitle>
                OTP Expires in <OtpTimer resetTimer={resetTimer} />
              </OTPInputExpireTitle>
            </OTPAcceptTCWrp>

            <OTPSubmitButton type="submit">{btnTxt}</OTPSubmitButton>
            <ResendOTPButton type="button" onClick={onClickResendOTP}>
              {resendOTPText}
            </ResendOTPButton>
          </OTPRightContainer>
        </OTPTotalWrp>
      </OTPCreatePasswordWrp>
      <AppFooter />
    </>
  );
};

export default OTPVerificationLogin;
