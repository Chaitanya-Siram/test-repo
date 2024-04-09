import React, { useState } from 'react';
import Proptypes from 'prop-types';

import {
  // ButtonMainWrp,
  // ButtonWrp,
  ErrorMessage,
  FormWrp,
  HeadingDesp,
  HeadingMain,
  IconWrp,
  InputField,
  // InputSubmit,
  InputWrp,
  LabelWrp,
  MainWrp,
} from './index.sc';
import Eye from '../../../assets/icons/Eye';
import VisiblityOff from '../../../assets/icons/VisiblityOff';
import { validatePassword } from '../../../pages/create-password/validatePassword';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../redux/slices/userSlice';
import PasswordValidator from '../../../pages/create-password/PasswordValidator';
import { Button } from '../../button';
import { theme } from '../../../constants/theme';

const ChangePasswordPopUp = ({
  Heading = 'Change Password',
  setShowChangePopUp,
  setShowOTPPopUp,
  userId,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [selectedSndIndex, setselectedSndIndex] = useState(false);
  const [passwordField, setPasswordFields] = useState({
    current_password: '',
    new_password: '',
    confirm_current_password: '',
  });
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [btnTxt, setBtnTxt] = useState('Continue');

  const passwordValidationResult = validatePassword(
    passwordField?.new_password
  );

  const dispatch = useDispatch();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // make an api call to the backend
    // setShowChangePopUp(false);
    setBtnTxt('Please Wait...');
    if (
      passwordValidationResult?.isLowerCaseValid &&
      passwordValidationResult?.isUpperCaseValid &&
      passwordValidationResult?.isNumberValid &&
      passwordValidationResult?.isLengthValid &&
      passwordValidationResult?.isSpecialCharactersValid &&
      passwordField.new_password === passwordField.confirm_current_password
    ) {
      try {
        const response = await dispatch(
          changePassword({
            id: userId,
            currentPassword: passwordField.current_password,
            newPassword: passwordField.new_password,
            confirmPassword: passwordField.confirm_current_password,
          })
        );
        if (response?.type === 'user/changePassword/fulfilled') {
          setShowChangePopUp(false);
          setShowOTPPopUp(true);
          setTimeout(() => {
            toast.success('Please verify your registered email for OTP');
          }, 2000);
        } else {
          console.log(response);
          // toast.error('An error occurred during the API call.');
          setErrorMessage(response?.payload);
        }
      } catch (error) {
        toast.error('An error occurred during the API call.');
        setErrorMessage(error);
      } finally {
        setBtnTxt(' Continue');
      }
    } else if (
      passwordField.new_password === '' &&
      passwordField.confirm_current_password !== ''
    ) {
      setErrorMessage('Please enter the "New Password" field.');
      setBtnTxt(' Continue');
    } else if (
      passwordField.confirm_current_password === '' &&
      passwordField.new_password !== ''
    ) {
      setErrorMessage('Please enter the "Confirm New Password" field.');
      setBtnTxt(' Continue');
    } else if (
      passwordField.new_password !== passwordField.confirm_current_password
    ) {
      setErrorMessage(
        'Passwords don’t match. Please recheck the passwords entered.'
      );
      setBtnTxt(' Continue');
    } else if (
      passwordField.new_password === '' ||
      passwordField.confirm_current_password === ''
    ) {
      setErrorMessage(
        'Please enter the "New Password" and "Confirm New Password" fields.'
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
      <MainWrp>
        <div>
          <HeadingMain>{Heading}</HeadingMain>
          <HeadingDesp>
            Please set a new password and verify via OTP
          </HeadingDesp>
        </div>
        <FormWrp onSubmit={handleSubmit}>
          <LabelWrp>Your Current Password</LabelWrp>
          <InputField
            type="password"
            placeholder="Current Password"
            value={passwordField?.current_password}
            required={true}
            onChange={(e) =>
              setPasswordFields({
                ...passwordField,
                current_password: e.target.value,
              })
            }
          ></InputField>
          <LabelWrp>New password</LabelWrp>
          <InputWrp
            outline={
              handleSubmit && passwordField.new_password === ''
                ? 'red'
                : '#e2e2e2'
            }
          >
            <InputField
              type={selectedIndex ? 'text' : 'password'}
              placeholder="New Password"
              value={passwordField?.new_password}
              required={true}
              onFocus={() => {
                setMessageVisible(true);
                validatePassword(passwordField?.new_password);
              }}
              onBlur={() => setMessageVisible(false)}
              onChange={(e) => {
                setPasswordFields({
                  ...passwordField,
                  new_password: e.target.value,
                });
                validatePassword(e.target.value);
                setErrorMessage('');
              }}
            ></InputField>
            <IconWrp onClick={() => setSelectedIndex((prev) => !prev)}>
              {selectedIndex ? <VisiblityOff /> : <Eye />}
            </IconWrp>
          </InputWrp>
          {/* {handleSubmit && passwordField.new_password === '' ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : (
            ''
          )} */}
          <LabelWrp>Confirm New Password</LabelWrp>
          <InputWrp
            outline={
              handleSubmit && passwordField.confirm_current_password === ''
                ? 'red'
                : '#e2e2e2'
            }
          >
            <InputField
              type={selectedSndIndex ? 'text' : 'password'}
              placeholder="Confirm Password"
              required={true}
              value={passwordField?.confirm_current_password}
              onChange={(e) => {
                setPasswordFields({
                  ...passwordField,
                  confirm_current_password: e.target.value,
                });
                validatePassword(e.target.value);
              }}
            ></InputField>
            <IconWrp onClick={() => setselectedSndIndex((prev) => !prev)}>
              {selectedSndIndex ? <VisiblityOff /> : <Eye />}
            </IconWrp>
          </InputWrp>
          {/* {handleSubmit &&
          passwordField.confirm_current_password === '' &&
          passwordField.new_password !== '' ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : (
            ''
          )} */}
          {/* <ButtonMainWrp>
            <ButtonWrp outline={true} onClick={() => setShowChangePopUp(false)}>
              Cancel
            </ButtonWrp>
            <InputSubmit onClick={handleSubmit} value={'Update'}></InputSubmit>
          </ButtonMainWrp> */}
          <ErrorMessage>
            {(handleSubmit &&
              passwordField.new_password === '' &&
              passwordField.confirm_current_password !== '') ||
            (handleSubmit &&
              passwordField.confirm_current_password === '' &&
              passwordField.new_password !== '')
              ? ''
              : errorMessage}
          </ErrorMessage>
          <Button
            title={btnTxt}
            backgroundColor={theme[selectedTheme].primary}
            btnStyle={{ width: '100%', height: '2.8' }}
            type="submit"
          />
        </FormWrp>
      </MainWrp>
      {isMessageVisible ? (
        <PasswordValidator
          passwordValidationResult={passwordValidationResult}
        />
      ) : (
        ''
      )}
    </>
  );
};
ChangePasswordPopUp.propTypes = {
  Heading: Proptypes.string,
  setShowChangePopUp: Proptypes.func,
  setShowOTPPopUp: Proptypes.func,
  userId: Proptypes.string,
};

export default ChangePasswordPopUp;
