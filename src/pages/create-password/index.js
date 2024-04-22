import React, { useEffect, useState } from 'react';
import {
  AcceptTCWrp,
  AlphaIcon,
  CheckBox,
  CreateIconWrp,
  CreateInputWrp,
  CreatePasswordWrp,
  ErrorMessage,
  InputField,
  InputFieldTitle,
  InputFieldWrp,
  LeftContainer,
  RightContainer,
  TitleDescpSec,
  TotalWrp,
} from './index.sc';
// import DarkLogo from '../../assets/img/bg/DarkLogo.svg';
import NewAMXLogo from '../../assets/img/app/Alphametricx-logo-mark-dark.png';
import { TitleWrp } from '../../components/edit-graph-popup/index.sc';
import { useNavigate, useSearchParams } from 'react-router-dom/dist';
import VisiblityOff from '../../assets/icons/VisiblityOff';
import Eye from '../../assets/icons/Eye';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getCreatePassword } from '../../redux/slices/userSlice';
import { theme } from '../../constants/theme';
import { Button } from '../../components/button';
import AppFooter from '../../components/app-footer';
import { loginTypeCreatePassword } from '../../constants';
import { axiosGetAPI } from '../../service';
import { validatePassword } from './validatePassword';
import PasswordValidator from './PasswordValidator';

const CreatePassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const [createPassword, setCreatePassword] = useState(initialValues);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [btnTxt, setBtnTxt] = useState('Continue');
  const [isFormSubmit, setIsFormSubmitted] = useState(false);
  const [userStatus, setUserStatus] = useState('loading');

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  console.log(userId);
  const passwordValidationResult = validatePassword(createPassword.newPassword);

  const submitHandle = async (e) => {
    e.preventDefault();
    setBtnTxt('Please Wait...');
    setIsFormSubmitted(true);
    if (
      passwordValidationResult?.isLowerCaseValid &&
      passwordValidationResult?.isUpperCaseValid &&
      passwordValidationResult?.isNumberValid &&
      passwordValidationResult?.isLengthValid &&
      passwordValidationResult?.isSpecialCharactersValid &&
      createPassword.newPassword === createPassword.confirmNewPassword &&
      checkbox
    ) {
      try {
        const response = await dispatch(
          getCreatePassword({
            id: userId,
            newPassword: createPassword.newPassword,
            confirmPassword: createPassword.confirmNewPassword,
          })
        );
        if (response?.type === 'user/createPassword/fulfilled') {
          navigate('/otp-verification-login', {
            state: {
              email,
              otpType: loginTypeCreatePassword,
              id: userId,
            },
          });
          setTimeout(() => {
            toast.success('Please verify your registered email for OTP');
          }, 2000);
        } else {
          toast.error('An error occurred during the API call.');
        }
      } catch (error) {
        toast.error('An error occurred during the API call.');
      } finally {
        setBtnTxt(' Continue');
      }
    } else if (
      createPassword.newPassword === '' &&
      createPassword.confirmNewPassword !== ''
    ) {
      setErrorMessage('Please enter the "New Password" field.');
      setBtnTxt(' Continue');
    } else if (
      createPassword.confirmNewPassword === '' &&
      createPassword.newPassword !== ''
    ) {
      setErrorMessage('Please enter the "Confirm New Password" field.');
      setBtnTxt(' Continue');
    } else if (
      createPassword.newPassword !== createPassword.confirmNewPassword
    ) {
      setErrorMessage(
        'Passwords don’t match. Please recheck the passwords entered.'
      );
      setBtnTxt(' Continue');
    } else if (
      createPassword.newPassword === '' ||
      createPassword.confirmNewPassword === ''
    ) {
      setErrorMessage(
        'Please enter the "New Password" and "Confirm New Password" fields.'
      );
      setBtnTxt(' Continue');
    } else if (!checkbox) {
      setErrorMessage('Please agree to the T&Cs to proceed further.');
      setBtnTxt(' Continue');
    } else {
      setMessageVisible(true);
      setErrorMessage(
        'Password doesn’t meet the strong password criteria. Please recheck the criteria.'
      );
      setBtnTxt(' Continue');
    }
  };

  const submitLogin = () => {
    // history.push('/login');
    navigate('/login');
  };

  const getCreatePasswordStatus = (id) => {
    return axiosGetAPI(`/settings/create_password/?id=${id}`, {}, {});
  };

  useEffect(() => {
    if (searchParams.get('email')) {
      setEmail(searchParams.get('email'));
      setFirstName(searchParams.get('firstName'));
      setUserId(searchParams.get('id'));
    } else {
      navigate('/');
    }

    if (userId) {
      getCreatePasswordStatus(userId)
        .then((resp) => {
          setUserStatus(resp?.status);
          if (resp && resp?.status === 'success') {
            setBtnTxt('Continue');
          } else if (resp && resp?.status === 'error') {
            setBtnTxt('Continue to Login');
          } else {
            setBtnTxt('Continue');
          }
          console.log(resp);
        })
        .catch((err) => {
          console.log('Error Message', err);
          setBtnTxt('Continue to Login');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, navigate, userId]);

  return (
    <>
      <CreatePasswordWrp>
        <TotalWrp>
          <LeftContainer>
            {' '}
            Build
            <br />
            Analytics with
            <br />
            intelligence
            <br />
          </LeftContainer>
          {userStatus === 'loading' ? (
            ''
          ) : userStatus === 'success' ? (
            <RightContainer errorMessageActive={isMessageVisible}>
              <AlphaIcon src={NewAMXLogo} />
              <TitleWrp>Create Password</TitleWrp>
              <TitleDescpSec>
                <b style={{ color: '#000' }}>
                  Hello{' '}
                  <span style={{ textTransform: 'capitalize' }}>
                    {firstName}
                  </span>
                  ,
                </b>{' '}
                <br />
                Create a new password for{' '}
                <b style={{ color: '#000' }}>
                  <span>{email}</span>
                </b>{' '}
                to start using Alphametricx
              </TitleDescpSec>
              <form onSubmit={submitHandle}>
                <InputFieldWrp>
                  <InputFieldTitle>New Password</InputFieldTitle>
                  <CreateInputWrp
                    outline={
                      submitHandle &&
                      createPassword.newPassword === '' &&
                      createPassword.confirmNewPassword !== ''
                        ? 'red'
                        : '#e2e2e2'
                    }
                  >
                    <InputField
                      type={showNewPassword ? 'text' : 'password'}
                      value={createPassword?.newPassword}
                      required={true}
                      onFocus={() => {
                        setMessageVisible(true);
                        validatePassword(createPassword?.newPassword);
                        setActiveField('newPassword');
                      }}
                      onBlur={() => setMessageVisible(false)}
                      onChange={(e) => {
                        setCreatePassword({
                          ...createPassword,
                          newPassword: e.target.value,
                        });
                        validatePassword(e.target.value);
                        setErrorMessage('');
                      }}
                    />
                    <CreateIconWrp
                      onClick={() => setShowNewPassword((prev) => !prev)}
                    >
                      {showNewPassword ? <VisiblityOff /> : <Eye />}
                    </CreateIconWrp>
                  </CreateInputWrp>
                  {submitHandle &&
                  createPassword.newPassword === '' &&
                  createPassword.confirmNewPassword !== '' ? (
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                  ) : null}
                </InputFieldWrp>
                <InputFieldWrp>
                  <InputFieldTitle>Confirm New Password</InputFieldTitle>
                  <CreateInputWrp
                    outline={
                      isFormSubmit &&
                      createPassword?.confirmNewPassword === '' &&
                      createPassword.newPassword !== ''
                        ? 'red'
                        : '#e2e2e2'
                    }
                  >
                    <InputField
                      type={showConfirmPassword ? 'text' : 'password'}
                      required={true}
                      value={createPassword?.confirmNewPassword}
                      onChange={(e) => {
                        setCreatePassword({
                          ...createPassword,
                          confirmNewPassword: e.target.value,
                        });
                        validatePassword(e.target.value);
                        setErrorMessage('');
                      }}
                    />
                    <CreateIconWrp
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <VisiblityOff /> : <Eye />}
                    </CreateIconWrp>
                  </CreateInputWrp>
                  {submitHandle &&
                  createPassword.confirmNewPassword === '' &&
                  createPassword.newPassword !== '' ? (
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                  ) : null}
                </InputFieldWrp>
                <ErrorMessage>
                  {(submitHandle &&
                    createPassword.newPassword === '' &&
                    createPassword.confirmNewPassword !== '') ||
                  (submitHandle &&
                    createPassword.confirmNewPassword === '' &&
                    createPassword.newPassword !== '')
                    ? ''
                    : errorMessage}
                </ErrorMessage>
                <AcceptTCWrp>
                  <label
                    htmlFor="myCheckbox"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                  >
                    {' '}
                    <CheckBox
                      type="checkbox"
                      id="myCheckbox"
                      checked={checkbox}
                      onChange={(e) => setCheckBox(e.target.checked)}
                    />{' '}
                    Accept T&C{' '}
                  </label>
                </AcceptTCWrp>
                {/* <SubmitButton
              onClick={submitHandle}
              // disabled={
              //   createPassword?.newPassword.length === 0 ||
              //   createPassword?.confirmNewPassword.length === 0
              // }
              type="submit"
            >
              Continue
            </SubmitButton> */}
                <Button
                  title={btnTxt}
                  backgroundColor={theme[selectedTheme].primary}
                  btnStyle={{ width: '100%', height: '2.8125rem' }}
                  type="submit"
                  disabled={btnTxt === 'loading...'}
                />
              </form>
            </RightContainer>
          ) : (
            <RightContainer errorMessageActive={isMessageVisible}>
              {/* <AlphaIcon src={DarkLogo} /> */}
              <TitleWrp>Link Expired</TitleWrp>
              <TitleDescpSec>
                <b style={{ color: '#000' }}>This link has expired.</b> <br />
                If you have already created your login credentials, please
                continue by logging in to your account.
              </TitleDescpSec>
              <form onSubmit={submitLogin}>
                <TitleDescpSec>
                  If you are facing trouble logging in, please reach out to us
                  at <b style={{ color: '#000' }}>support@amx.com</b>
                </TitleDescpSec>
                <Button
                  title={btnTxt}
                  backgroundColor={theme[selectedTheme].primary}
                  btnStyle={{ width: '100%', height: '2.8125rem' }}
                  type="submit"
                />
              </form>
            </RightContainer>
          )}
          {isMessageVisible ? (
            <PasswordValidator
              passwordValidationResult={passwordValidationResult}
              activeField={activeField}
            />
          ) : (
            ''
          )}
        </TotalWrp>
      </CreatePasswordWrp>
      <AppFooter />
    </>
  );
};

export default CreatePassword;
