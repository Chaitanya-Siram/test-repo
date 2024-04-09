import React from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  ButtonBoxwpr,
  ErrorContentContainer,
  ErrorHandlerContainer,
  ErrorMessage,
  ErrorMessageWrp,
  ErrorText,
  ErrorContentInfo,
} from './index.sc';
import ErrorIcon from '../../assets/icons/ErrorIcon';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';

const ErrorHandler = () => {
  const navigate = useNavigate();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  return (
    <ErrorHandlerContainer role="alert">
      <ErrorContentContainer backgroundColor={theme[selectedTheme].background}>
        <ErrorContentInfo>
          <ErrorIcon />
          <ErrorMessageWrp>
            <ErrorMessage fontColor={theme[selectedTheme].keyValueColor}>
              Sorry,
            </ErrorMessage>
            <ErrorMessage fontColor={theme[selectedTheme].keyValueColor}>
              Something went wrong
            </ErrorMessage>
          </ErrorMessageWrp>
        </ErrorContentInfo>
        <ErrorText fontColor={theme[selectedTheme].errorPageText}>
          An unexpected error has occurred.
        </ErrorText>
        <ButtonBoxwpr
          backgroundColor={theme[selectedTheme].errorButtonBackground}
          fontColor={theme[selectedTheme].logoText}
          onClick={() => {
            navigate('/');
            navigate(0);
          }}
        >
          Go back to home page
        </ButtonBoxwpr>
      </ErrorContentContainer>
    </ErrorHandlerContainer>
  );
};

export default ErrorHandler;

ErrorHandler.propTypes = {
  error: Proptypes.object,
  resetErrorBoundary: Proptypes.func,
};
