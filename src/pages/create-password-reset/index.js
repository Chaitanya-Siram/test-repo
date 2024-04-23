import React, { useState } from 'react';
import {
  AlphaIcon,
  CreateIconWrp,
  CreateInputWrp,
  CreatePasswordWrp,
  InputField,
  InputFieldTitle,
  InputFieldWrp,
  LeftContainer,
  RightContainer,
  TitleDescpSec,
  TotalWrp,
  ValidationText,
  ValidationTitle,
  ValidationWrp,
  ValidationsListWrp,
} from './index.sc';
import { Img } from '../../assets/img';
import { TitleWrp } from '../../components/edit-graph-popup/index.sc';
import { useNavigate, useSearchParams } from 'react-router-dom/dist';
import VisiblityOff from '../../assets/icons/VisiblityOff';
import Eye from '../../assets/icons/Eye';
import { ErrorTxt } from '../login/index.sc';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../redux/slices/userSlice';
import { SuccessTxt } from '../otp-verification-login/index.sc';
import { Button } from '../../components/button';
import { theme } from '../../constants/theme';
import AppFooter from '../../components/app-footer';

const CreatePasswordReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const [createPassword, setCreatePassword] = useState(initialValues);
  const [showNewPassword, setShowNewPassword] = useState(false);
  // const [checkbox, setCheckBox] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isLowerCaseValid, setLowerCaseValid] = useState(false);
  const [isUpperCaseValid, setUpperCaseValid] = useState(false);
  const [isNumberValid, setNumberValid] = useState(false);
  const [isLengthValid, setLengthValid] = useState(false);
  const [isSpecialCharacterValid, setSpecialCharacterValid] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [btnTxt, setBtnTxt] = useState('Continue');

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  React.useEffect(() => {
    if (searchParams.get('email')) {
      setEmail(searchParams.get('email'));
    }
    const userinfo = searchParams.get('first_name');
    if (userinfo) {
      setName(userinfo);
    }
    if (searchParams.get('token')) {
      setAccessToken(searchParams.get('token'));
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  const validatePassword = (value) => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"<>?,./\\|-]/g;

    // setMessageVisible(true);

    const isLowerCaseValid = value?.match(lowerCaseLetters);
    const isUpperCaseValid = value.match(upperCaseLetters);
    const specialCharactersValid = value.match(specialCharacters);
    const isNumberValid = value.match(numbers);

    const isLengthValid = value.length >= 12;

    setLowerCaseValid(isLowerCaseValid);
    setUpperCaseValid(isUpperCaseValid);
    setNumberValid(isNumberValid);
    setLengthValid(isLengthValid);
    setSpecialCharacterValid(specialCharactersValid);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setBtnTxt('Please Wait...');
    if (
      isLowerCaseValid &&
      isUpperCaseValid &&
      isNumberValid &&
      isLengthValid &&
      isSpecialCharacterValid &&
      createPassword.newPassword === createPassword.confirmNewPassword
    ) {
      console.log(createPassword);
      const data = await dispatch(
        updatePassword({
          email,
          new_password: createPassword?.newPassword,
          confirm_new_password: createPassword?.confirmNewPassword,
          accessToken,
        })
      );
      if (data?.type === 'user/updatePassword/rejected') {
        setErrorMessage(data?.payload);
        setBtnTxt(' Continue');
      } else if (data?.type === 'user/updatePassword/fulfilled') {
        setSuccessMessage(
          'Your password has been successfully updated. Please wait for the redirect to the login page in 3 seconds.'
        );
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
      console.log(data);
      // TODO: need to call dispatch API for Update password
    } else if (
      createPassword?.newPassword.length === 0 ||
      createPassword?.confirmNewPassword.length === 0
    ) {
      setErrorMessage('Password fields are empty');
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
        'Please enter both the "New Password" and "Confirm New Password" fields.'
      );
      setBtnTxt(' Continue');
    } else {
      setMessageVisible(true);
      setErrorMessage(
        'Password doesn’t meet the strong password criteria. Please recheck the criteria.'
      );
      setBtnTxt(' Continue');
    }
  };
  return (
    <>
      <CreatePasswordWrp>
        <TotalWrp>
          <LeftContainer>Build Analytics with intelligence</LeftContainer>
          <RightContainer>
            <AlphaIcon src={Img.DarkLogo} />
            <TitleWrp>Create Password</TitleWrp>
            <TitleDescpSec>
              <b>
                Hello{' '}
                <span style={{ textTransform: 'capitalize', color: '#000' }}>
                  {name}
                </span>
                ,
              </b>{' '}
              <br />
              Create a new password for <b style={{ color: '#000' }}>
                {email}
              </b>{' '}
              to start using Alphametricx
            </TitleDescpSec>
            <form onSubmit={submitHandle}>
              <InputFieldWrp>
                <InputFieldTitle>New Password</InputFieldTitle>
                <CreateInputWrp>
                  <InputField
                    type={showNewPassword ? 'text' : 'password'}
                    value={createPassword?.newPassword}
                    autoComplete="off"
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
                    }}
                  />
                  <CreateIconWrp
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? <VisiblityOff /> : <Eye />}
                  </CreateIconWrp>
                </CreateInputWrp>
              </InputFieldWrp>
              <InputFieldWrp>
                <InputFieldTitle>Confirm New Password</InputFieldTitle>
                <CreateInputWrp>
                  <InputField
                    type={showConfirmPassword ? 'text' : 'password'}
                    required={true}
                    autoComplete="new-password"
                    name="unique-password-field"
                    value={createPassword?.confirmNewPassword}
                    // onFocus={() => {
                    //   setMessageVisible(true);
                    //   validatePassword(createPassword?.confirmNewPassword);
                    //   setActiveField('confirmNewPassword');
                    // }}
                    // onBlur={() => setMessageVisible(false)}
                    onChange={(e) => {
                      setCreatePassword({
                        ...createPassword,
                        confirmNewPassword: e.target.value,
                      });
                      validatePassword(e.target.value);
                    }}
                  />
                  <CreateIconWrp
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <VisiblityOff /> : <Eye />}
                  </CreateIconWrp>
                </CreateInputWrp>
              </InputFieldWrp>
              <ErrorTxt style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                {errorMessage}
              </ErrorTxt>
              {successMessage && <SuccessTxt>{successMessage}</SuccessTxt>}
              <Button
                title={btnTxt}
                backgroundColor={theme[selectedTheme].primary}
                btnStyle={{ width: '100%', height: '2.8125rem' }}
                type="submit"
              />
            </form>
          </RightContainer>
          {isMessageVisible ? (
            <ValidationWrp
              margin={activeField === 'newPassword' ? '14rem' : '16.4rem'}
            >
              <ValidationTitle>Create a strong password</ValidationTitle>
              <ValidationsListWrp>
                {isUpperCaseValid ? (
                  <img src={Img.Check} alt="check" />
                ) : (
                  <img src={Img.Cancel} alt="check" />
                )}
                <ValidationText>Include UpperCase</ValidationText>
              </ValidationsListWrp>
              <ValidationsListWrp>
                {isLowerCaseValid ? (
                  <img src={Img.Check} alt="check" />
                ) : (
                  <img src={Img.Cancel} alt="check" />
                )}
                <ValidationText>Include Lowercase</ValidationText>
              </ValidationsListWrp>
              <ValidationsListWrp>
                {isNumberValid ? (
                  <img src={Img.Check} alt="check" />
                ) : (
                  <img src={Img.Cancel} alt="check" />
                )}
                <ValidationText>Include Number</ValidationText>
              </ValidationsListWrp>
              <ValidationsListWrp>
                {isSpecialCharacterValid ? (
                  <img src={Img.Check} alt="check" />
                ) : (
                  <img src={Img.Cancel} alt="check" />
                )}
                <ValidationText>Include Special Character</ValidationText>
              </ValidationsListWrp>
              <ValidationsListWrp>
                {isLengthValid ? (
                  <img src={Img.Check} alt="check" />
                ) : (
                  <img src={Img.Cancel} alt="check" />
                )}
                <ValidationText>Min 12 characters</ValidationText>
              </ValidationsListWrp>
            </ValidationWrp>
          ) : (
            ''
          )}
        </TotalWrp>
      </CreatePasswordWrp>
      <AppFooter />
    </>
  );
};

export default CreatePasswordReset;
