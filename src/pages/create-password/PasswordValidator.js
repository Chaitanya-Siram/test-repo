import React from 'react';
import {
  ValidateIcon,
  ValidateWrp,
  ValidationText,
  ValidationTitle,
  ValidationWrp,
  ValidationsListWrp,
} from './index.sc';
import { Img } from '../../assets/img';
import PropTypes from 'prop-types';

const PasswordValidator = ({ passwordValidationResult, activeField }) => {
  return (
    <ValidationWrp
      margin={activeField === 'newPassword' ? '16rem' : '-21.5rem'}
      marginLeft={activeField === 'newPassword' ? '26rem' : '24rem'}
    >
      <ValidationTitle>Create a strong password</ValidationTitle>
      <ValidateWrp>
        <ValidationsListWrp>
          <ValidateIcon>
            {passwordValidationResult?.isUpperCaseValid ? (
              <img src={Img.Check} alt="check" />
            ) : (
              <img src={Img.Cancel} alt="check" />
            )}
          </ValidateIcon>
          <ValidationText>Include UpperCase</ValidationText>
        </ValidationsListWrp>
        <ValidationsListWrp>
          <ValidateIcon>
            {passwordValidationResult?.isLowerCaseValid ? (
              <img src={Img.Check} alt="check" />
            ) : (
              <img src={Img.Cancel} alt="check" />
            )}
          </ValidateIcon>
          <ValidationText>Include Lowercase</ValidationText>
        </ValidationsListWrp>
        <ValidationsListWrp>
          <ValidateIcon>
            {passwordValidationResult?.isNumberValid ? (
              <img src={Img.Check} alt="check" />
            ) : (
              <img src={Img.Cancel} alt="check" />
            )}
          </ValidateIcon>
          <ValidationText>Include Number</ValidationText>
        </ValidationsListWrp>
        <ValidationsListWrp>
          <ValidateIcon>
            {passwordValidationResult?.isSpecialCharactersValid ? (
              <img src={Img.Check} alt="check" />
            ) : (
              <img src={Img.Cancel} alt="check" />
            )}
          </ValidateIcon>
          <ValidationText>Include Special Character</ValidationText>
        </ValidationsListWrp>
        <ValidationsListWrp>
          <ValidateIcon>
            {passwordValidationResult?.isLengthValid ? (
              <img src={Img.Check} alt="check" />
            ) : (
              <img src={Img.Cancel} alt="check" />
            )}
          </ValidateIcon>
          <ValidationText>Min 12 characters</ValidationText>
        </ValidationsListWrp>
      </ValidateWrp>
    </ValidationWrp>
  );
};

PasswordValidator.propTypes = {
  activeField: PropTypes.string,
  passwordValidationResult: PropTypes.func,
};

export default PasswordValidator;
