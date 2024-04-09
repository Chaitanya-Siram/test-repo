import React, { useState } from 'react';
// import {
//   OTPAcceptTCWrp,
//   OTPAlphaIcon,
//   OTPInputExpireTitle,
//   OTPInputField,
//   OTPInputFieldTitle,
//   OTPInputFieldWrp,
//   OTPRightContainer,
//   OTPSubmitButton,
//   OTPTitleDescpSec,
//   OTPTitleWrp,
//   ResendOTPButton,
// } from '../../../pages/otp-verification-login/index.sc';
// import { ErrorTxt } from '../../../pages/login/index.sc';
import OtpTimer from '../../../pages/otp-verification-login/otpTimer';
// import { Img } from '../../../assets/img';
import Proptypes from 'prop-types';
import {
  ChangePasswordErrorTxt,
  ChangePasswordSuccessTxt,
  ChangePwdOTPDescp,
  ChangePwdOTPInput,
  ChangePwdOTPLabel,
  ChangePwdOTPResend,
  ChangePwdOTPTitle,
  ChangePwdOTPTitleWrp,
  ChangePwdOTPWrp,
  // OTPMainWrp,
} from './index.sc';
import { Button } from '../../button';
import { theme } from '../../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  resendOTP,
  verifyChangePasswordOTP,
} from '../../../redux/slices/userSlice';
import { useLocation } from 'react-router-dom';
import { otpTypechangePassword } from '../../../constants';
import toast from 'react-hot-toast';

const ChangePasswordOTPPopUp = ({
  heading = 'OTP Verification',
  userId,
  email,
  setShowOTPPopUp,
}) => {
  const [btnTxt, setBtnTxt] = useState('Submit');
  const [otp, setOtp] = React.useState('');
  const [otpErorMessage, setOTPErrorMessage] = React.useState(null);
  const [otpSuccessMessage, setOptSuccessMessage] = React.useState(null);
  const [resendOTPText, setResendOTPText] = useState('Resend OTP');
  // const [otpType, setOTPType] = useState('');
  const [disableButton, setDisabledbutton] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const location = useLocation();
  console.log(location.state);

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const dispatch = useDispatch();

  const onChangeSubmitOTP = async (e) => {
    // debugger;
    e.preventDefault();
    setOTPErrorMessage(null);
    setOptSuccessMessage(null);
    setBtnTxt('Please Wait...');
    try {
      if (otp) {
        setOTPErrorMessage('');
        const data = await dispatch(
          verifyChangePasswordOTP({ id: userId, otpNumber: otp })
        );
        if (data?.type === 'user/verifyChangePasswordOTP/rejected') {
          setOTPErrorMessage(data?.payload);
          setOtp('');
        } else if (data?.type === 'user/verifyChangePasswordOTP/fulfilled') {
          const { payload } = data;
          console.log(data);
          setShowOTPPopUp(false);
          toast.success(payload?.msg);
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
          otpType: otpTypechangePassword,
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
    <ChangePwdOTPWrp
      onSubmit={(e) => {
        if (disableButton) {
          return null;
        } else {
          setDisabledbutton(true);
          onChangeSubmitOTP(e);
        }
      }}
    >
      <ChangePwdOTPTitleWrp>
        <ChangePwdOTPTitle>{heading}</ChangePwdOTPTitle>
        <ChangePwdOTPDescp>
          Please input the 6 digit OTP sent to <br />
          <b style={{ color: '#000000' }}>{email}</b>
        </ChangePwdOTPDescp>
      </ChangePwdOTPTitleWrp>
      <ChangePwdOTPTitleWrp>
        <ChangePwdOTPLabel>Enter OTP</ChangePwdOTPLabel>
        <ChangePwdOTPInput
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
      </ChangePwdOTPTitleWrp>
      {otpErorMessage && (
        <ChangePasswordErrorTxt>{otpErorMessage}</ChangePasswordErrorTxt>
      )}
      {otpSuccessMessage && (
        <ChangePasswordSuccessTxt>{otpSuccessMessage}</ChangePasswordSuccessTxt>
      )}
      <ChangePwdOTPTitleWrp>
        <ChangePwdOTPDescp>
          OTP Expire in <OtpTimer resetTimer={resetTimer} />
        </ChangePwdOTPDescp>
      </ChangePwdOTPTitleWrp>
      <ChangePwdOTPTitleWrp>
        <Button
          title={btnTxt}
          backgroundColor={theme[selectedTheme].primary}
          btnStyle={{ width: '100%', height: '2.8' }}
          type="submit"
        />
        <ChangePwdOTPResend type="button" onClick={onClickResendOTP}>
          {resendOTPText}
        </ChangePwdOTPResend>
      </ChangePwdOTPTitleWrp>
    </ChangePwdOTPWrp>
  );
};

ChangePasswordOTPPopUp.propTypes = {
  heading: Proptypes.string,
  setShowOTPPopUp: Proptypes.func,
  userId: Proptypes.string,
  email: Proptypes.string,
};

export default ChangePasswordOTPPopUp;
