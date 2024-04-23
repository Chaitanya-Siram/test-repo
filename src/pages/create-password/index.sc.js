import styled from 'styled-components';
import { Img } from '../../assets/img';

export const CreatePasswordWrp = styled.div`
  width: 100%;
  height: calc(100vh - 30px);
  background-image: url(${Img.LoginBg2});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TotalWrp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  min-height: 100vh;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  width: 27rem;
  color: #fff;
  font-family: Inter;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 4rem;
  letter-spacing: -0.96px;
  position: absolute;
  bottom: 5rem;
  left: 5rem;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: auto;
  max-width: 25rem;
  @media (min-width: 1200px) {
    width: 30%;
  }
  padding: 2rem;
  justify-content: center;
  align-items: flex-start;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0px 44px 34px -10px rgba(0, 0, 0, 0.16);
  margin-bottom: auto;
  margin-top: auto;
`;

export const AlphaIcon = styled.img`
  width: 2.9375rem;
  height: 2.5rem;
  display: flex;
  align-self: stretch;
  margin-bottom: 1.25rem;
`;

export const TitleWrp = styled.h1`
  align-self: stretch;
  color: #000;
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
  margin-bottom: 0.75rem;
`;

export const TitleDescpSec = styled.p`
  width: 22rem;
  align-self: stretch;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
  letter-spacing: -0.14px;
  color: rgba(0, 0, 0, 0.6);
  margin-block-start: 0.75rem;
  margin-block-end: 1.5rem;
`;

export const InputFieldWrp = styled.div`
  display: flex;
  width: 21rem;
  height: 4.4rem;
  gap: 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

export const InputFieldTitle = styled.h3`
  color: #000;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.14px;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const CreateInputWrp = styled.div`
  display: flex;
  width: 21rem;
  /* height: 3rem; */
  flex-direction: row;
  align-items: flex-start;
  border-radius: 8px;
  border: 1px solid ${(props) => props.outline};
`;

export const InputField = styled.input`
  width: 20rem;
  display: flex;
  padding: 14px;
  align-items: flex-start;
  align-self: stretch;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 0.5rem;
`;

export const CreateIconWrp = styled.div`
  padding: 0.875rem 0.5rem 0 0;
  cursor: pointer;
`;

export const AcceptTCWrp = styled.div`
  display: flex;
  width: auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  padding: 0 0 1.5rem 0rem;
`;

export const CheckBox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: #4d33eb;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom: auto;
  min-height: 0.8rem;
`;

export const CreatePasswordForm = styled.form`
  width: auto;
  height: auto;
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 1.40635rem 1rem;
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
`;

export const ValidationWrp = styled.div`
  display: flex;
  flex: 1;
  width: 13.125rem;
  height: auto;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  background: #fff;
  position: absolute;
  margin-left: ${(prop) => prop.marginLeft};
  margin-top: ${(props) => props.margin};
  &::before {
    content: '';
    position: absolute;
    left: -1rem;
    rotate: 180deg;
    top: 50%;
    border-width: 0.5rem;
    border-style: solid;
    border-color: transparent transparent transparent #fff;
    transform: translateY(-50%);
  }
`;

export const ValidationTitle = styled.h3`
  color: #000;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.4rem;
  letter-spacing: -0.14px;
  margin-block-start: 0em;
  margin-block-end: 1em;
`;

export const ValidateWrp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

export const ValidationsListWrp = styled.span`
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  gap: 0.5rem;
`;
export const ValidationText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.12px;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const ValidateIcon = styled.p`
  width: 1rem;
  height: 1rem;
`;

export const CreatePasswordFooter = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;

export const CreatePasswordContactFooter = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  margin-left: 1em;
`;
// export const ValidateText = styled.
