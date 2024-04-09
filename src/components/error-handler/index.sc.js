import styled from 'styled-components';
import AmxErrorBackgroundImage from '../../assets/img/AMX_error-background.jpg';

export const ErrorHandlerContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${AmxErrorBackgroundImage});
  background-size: cover;
  z-index: 100000;
  overflow-y: scroll;
  scrollbar-width: none;
`;

export const ErrorContentContainer = styled.div`
display: flex;
width: 28%;
padding: 2rem;
flex-direction: column;
border-radius: 1.25rem;
background: ${(props) => props?.backgroundColor};
box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09), 0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09), 0 32px 16px rgba(0, 0, 0, 0.09);
margin: 1% auto;
transform: translateY(200px);
animation: demo-load 0.3s ease-out;
animation-fill -mode: forwards;
animation-delay: 0.2s;
`;

export const ErrorContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const ErrorMessage = styled.h4`
  font-family: Inter;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.43rem;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${(props) => props?.fontColor};
  margin: 0;
`;
export const ErrorMessageWrp = styled.div`
  margin: 0;
`;

export const ErrorText = styled.p`
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: 0em;
  text-align: left;
  color: ${(props) => props?.fontColor};
  margin: 0.625rem 0rem 0rem 0rem;
`;

export const ButtonBoxwpr = styled.div`
  margin-top: 2.5rem;
  padding: 0.875rem 1rem 0.875rem 1rem;
  border-radius: 0.5rem;
  gap: 16px;
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.0625rem;
  background: ${(props) => props?.backgroundColor};
  letter-spacing: -0.01em;
  text-align: center;
  color: ${(props) => props?.fontColor};
`;
