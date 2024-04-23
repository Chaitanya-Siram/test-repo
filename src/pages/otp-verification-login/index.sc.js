import styled from 'styled-components';
import { Img } from '../../assets/img';

export const OTPCreatePasswordWrp = styled.div`
  background-image: url(${Img.LoginBg2});
  background-size: 180%; /* You can use 'cover' to make the background cover the entire container */
  background-position: center; /* Center the background image */
  height: 100vh; /* Set the height to 100% of the viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OTPTotalWrp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  min-height: 100vh;
`;

export const OTPLeftContainer = styled.div`
  width: 26.875rem;
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

export const OTPRightContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  justify-content: center;
  align-items: flex-start;
  /* gap: 0.5rem; */
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0px 44px 34px -10px rgba(0, 0, 0, 0.16);
  margin-bottom: auto; /* Position from the bottom */
  margin-top: auto; /* Position from the bottom */
`;

export const OTPAlphaIcon = styled.img`
  width: 2.9375rem;
  height: 2.5rem;
  display: flex;
  align-self: stretch;
  margin-bottom: 1.25rem;
`;

export const OTPTitleWrp = styled.h1`
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

export const OTPTitleDescpSec = styled.p`
  width: 22rem;
  align-self: stretch;
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 157.143% */
  letter-spacing: -0.14px;
  color: rgba(0, 0, 0, 0.6);
  margin-block-start: 0.75rem;
  margin-block-end: 0;
`;

export const OTPInputFieldWrp = styled.div`
  display: flex;
  width: 21rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const OTPInputFieldTitle = styled.h3`
  color: #000;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.14px;
  margin-block-start: 1.5rem;
  margin-block-end: 0;
`;

export const OTPInputField = styled.input`
  display: flex;
  padding: 0.8rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #e2e2e2;
  background: #fff;
  text-align: center;
  &:focus {
    border-color: #4d33eb; /* Change the border color on focus to #E2E2E2 */
    outline: none; /* Remove the default focus outline (you can style your own) */
  }
`;

export const OTPAcceptTCWrp = styled.div`
  display: flex;
  width: 25rem;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
`;

export const OTPInputExpireTitle = styled.p`
  color: #4f4f4f;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.14px;
  margin-block-start: 1.5rem;
  margin-block-end: 1.5rem;
`;
export const OTPSubmitButton = styled.button`
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
`;

export const ResendOTPButton = styled.button`
  background-color: transparent;
  color: #4d33eb;
  border: none;
  margin-top: 1em;
  cursor: pointer;
  z-index: 10;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.14px;
`;

export const SuccessTxt = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: #5927e9;
  margin-top: 1em;
  margin-bottom: 1em;
`;
