import styled from 'styled-components';
import LoginBg2 from '../../assets/img/loginImg/LoginBg2.png';

export const ForgotPasswordCreatePasswordWrp = styled.div`
  background-image: url(${LoginBg2});
  background-size: 180%; /* You can use 'cover' to make the background cover the entire container */
  background-position: center; /* Center the background image */
  height: 100vh; /* Set the height to 100% of the viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ForgotPasswordTotalWrp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  min-height: 100vh;
`;

export const ForgotPasswordLeftContainer = styled.div`
  width: 27rem;
  color: #fff;
  font-family: Inter;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 4rem; /* 133.333% */
  letter-spacing: -0.96px;
  position: absolute;
  bottom: 5rem;
  left: 5rem;
`;

export const ForgotPasswordRightContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  justify-content: center;
  align-items: flex-start;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0px 44px 34px -10px rgba(0, 0, 0, 0.16);
  margin-bottom: auto; /* Position from the bottom */
  margin-top: auto; /* Position from the top */
`;

export const ForgotPasswordAlphaIcon = styled.img`
  width: 4rem;
  height: 3rem;
  display: flex;
  align-self: stretch;
  margin-bottom: 1.25rem;
  margin-left: -0.7rem;
`;

export const ForgotPasswordTitleWrp = styled.h1`
  align-self: stretch;
  color: #000;
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const ForgotPasswordTitleDescpSec = styled.p`
  width: 22rem;
  align-self: stretch;
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 157.143% */
  letter-spacing: -0.14px;
  color: rgba(0, 0, 0, 0.6);
  margin-block-start: 0.75rem;
  margin-block-end: 1.5rem;
`;

export const ForgotPasswordInputFieldWrp = styled.div`
  display: flex;
  width: 21rem;
  flex-direction: column;
  align-items: flex-start;
`;

export const ForgotPasswordInputFieldTitle = styled.h3`
  color: #000;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.14px;
  margin-block-start: 0;
  margin-block-end: 0.75rem;
`;

export const ForgotPasswordInputField = styled.input`
  display: flex;
  padding: 0.875rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #e2e2e2;
  background: #fff;
  &:focus {
    border-color: #4d33eb; /* Change the border color on focus to #E2E2E2 */
    outline: none; /* Remove the default focus outline (you can style your own) */
  }
  /* margin-bottom: 1em; */
`;

export const ForgotPasswordAcceptTCWrp = styled.div`
  display: flex;
  width: 25rem;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  padding: 1rem 0rem;
`;

export const ForgotPasswordSubmitButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 14px 16px;
  align-self: stretch;
  border-radius: 8px;
  background: #5927e9;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.14px;
  cursor: pointer;
  outline: none;
  border: none;
  margin-top: 1.5rem;
`;
