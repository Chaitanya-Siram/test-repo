import styled from 'styled-components';

export const ChangePwdOTPWrp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const ChangePwdOTPTitleWrp = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ChangePwdOTPTitle = styled.h1`
  font-family: Inter;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: -0.02em;
  text-align: left;
  color: #000000;
`;

export const ChangePwdOTPDescp = styled.p`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #00000099;
`;

export const ChangePwdOTPLabel = styled.p`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #000000;
`;

export const ChangePwdOTPInput = styled.input`
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

export const ChangePwdOTPResend = styled.a`
  text-decoration: none;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #4d33eb;
  margin-top: 0.85rem;
`;

export const ChangePasswordErrorTxt = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: red;
`;

export const ChangePasswordSuccessTxt = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: #5927e9;
  margin-top: 1em;
  margin-bottom: 1em;
`;
