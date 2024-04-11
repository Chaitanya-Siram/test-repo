import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { theme } from '../../constants/theme';

import {
  Checkbox,
  CheckboxText,
  ErrorTxt,
  FormGraytxt,
  FormLightTxt,
  // GroupAbstract,
  // RectagleImgwpr,
  Input,
  InputContainer,
  LightGray,
  LinkWrp,
  // LoginBtn,
  LoginContrwpr,
  // LoginFooter,
  LoginForm,
  LoginFormBox,
  LoginFormCtrn,
  LoginFormwpr,
  LoginTextDsly,
  // LogoBox,
  LogoImgwpr,
  // LogoTextwpr,
  // LoginContactFooter,
  // GroupAbstract,
  // CarouselWrpr,
  // CarouselScrollWrpr,
} from './index.sc';
import { Img } from '../../assets/img';
import { ValidateEmail } from './validateEmail';
import { Button } from '../../components/button';
import AppFooter from '../../components/app-footer';
import { setAuthenticationTokens } from '../../constants';
// import { SlideWrapper } from '../../components/carousel/index.sc';
// import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

const InputBox = ({ type, handleChange, label, error, validateFunc }) => {
  return (
    <InputContainer>
      <FormLightTxt>{label}</FormLightTxt>
      <Input
        type={type}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        onBlur={(e) => validateFunc(e.target.value)}
      />
      {error && <ErrorTxt>{error}</ErrorTxt>}
    </InputContainer>
  );
};

InputBox.propTypes = {
  type: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string,
  validateFunc: PropTypes.func,
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [commonErrorMessage, setCommonErrorMessage] = useState(null);
  const [btnTxt, setBtnTxt] = useState('Login');
  const [disableButton, setDisabledbutton] = useState(false);

  const submitLoginDetails = async (e) => {
    e.preventDefault();
    if (disableButton) {
      return;
    }
    setDisabledbutton(true);
    setBtnTxt('Please Wait...');
    setEmailError(null);
    setPasswordError(null);
    try {
      let isEmailGood = true;
      let isPasswordGood = false;
      if (email) {
        const isValid = ValidateEmail(email);
        if (!isValid) {
          setEmailError('Please enter a valid email address.');
          isEmailGood = false;
        } else {
          setEmailError(null);
          isEmailGood = true;
        }
      } else {
        setEmailError('Email is required');
        isEmailGood = false;
      }

      if (!password) {
        setPasswordError('Password is required');
        isPasswordGood = false;
      } else {
        setPasswordError(null);
        isPasswordGood = true;
      }
      if (isEmailGood && isPasswordGood) {
        const data = await dispatch(
          getUserDetails({ email, password, should_remember: rememberMe })
        );
        if (data?.type === 'user/getData/fulfilled') {
          const { payload } = data;
          if (payload?.token) {
            const tokenInfo = payload?.token;
            setAuthenticationTokens(tokenInfo);
            window.location = window.location.origin;
          } else {
            navigate('/otp-verification-login', {
              state: {
                email,
                otpType: 'login',
                rememberMe,
              },
              replace: true,
            });
          }
        } else {
          setCommonErrorMessage(data?.payload);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnTxt('Login');
      setDisabledbutton(false);
    }
  };

  const emailValidateFunction = (email) => {
    if (email) {
      const isValid = ValidateEmail(email);
      if (!isValid) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError(null);
      }
    } else {
      setEmailError('Email is required');
    }
    setCommonErrorMessage(null);
  };

  const passwordValidateFunction = (password) => {
    if (password) {
      setPasswordError(null);
    } else {
      setPasswordError('Password is required');
    }
    setCommonErrorMessage(null);
  };

  // const [newCanvasPopCont, setNewCanvasPopCont] = useState(false);
  // const updateParentStateCont = (newValue) => {
  //   setNewCanvasPopCont(newValue);
  // };

  return (
    <>
      <LoginContrwpr imageUrl={Img.LoginBg2}>
        <LoginTextDsly>
          Build
          <br />
          Analytics with
          <br />
          intelligence
          <br />
        </LoginTextDsly>
        <LoginFormCtrn>
          <LoginFormwpr>
            {/* <LogoBox> */}
            <LogoImgwpr src={Img.DarkLogo} />
            {/* <LogoTextwpr>AlphametricX</LogoTextwpr> */}
            {/* </LogoBox> */}
            <div
              style={{
                height: '100%',
                display: 'flex',
                FlexDirection: 'coloumn',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LoginFormBox>
                <FormGraytxt>Login to Alpha</FormGraytxt>
                <LoginForm onSubmit={submitLoginDetails}>
                  <InputBox
                    label="Registered Email"
                    handleChange={setEmail}
                    error={emailError}
                    validateFunc={emailValidateFunction}
                  />
                  <InputBox
                    label="Password"
                    type="password"
                    handleChange={setPassword}
                    error={passwordError}
                    validateFunc={passwordValidateFunction}
                  />
                  {commonErrorMessage && (
                    <ErrorTxt>{commonErrorMessage}</ErrorTxt>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <Checkbox
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <CheckboxText>Remember me?</CheckboxText>
                  </div>

                  <Button
                    title={btnTxt}
                    backgroundColor={theme[selectedTheme].primary}
                    btnStyle={{ width: '100%', height: '2.8125rem' }}
                    type="submit"
                  />
                  <LinkWrp>
                    <LightGray to="/forgot-password">Forgot Password?</LightGray>
                    <LightGray >|</LightGray>
                    <LightGray to="https://www.alphametricx.com/request-demo" target="_blank">Request Demo</LightGray>
                  </LinkWrp>
                </LoginForm>
              </LoginFormBox>
            </div>
          </LoginFormwpr>
        </LoginFormCtrn>
      </LoginContrwpr>
      {/* <LoginFooter>
        <LoginContactFooter>
          <div>Contact Us</div>
          <div>Privacy Policy</div>
        </LoginContactFooter>
        <div>
          <div style={{ marginRight: '10px' }}>
            &copy; Alphametricx © 2023 . All rights reserved
          </div>
        </div>
      </LoginFooter> */}
      <AppFooter />
      {/* <DashboardPopup
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
      ></DashboardPopup> */}
    </>
  );
};

export default LoginPage;
