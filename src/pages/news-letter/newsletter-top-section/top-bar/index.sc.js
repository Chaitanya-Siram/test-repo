import styled, { keyframes } from 'styled-components';

export const TopBarWrp = styled.div`
  display: flex;
  padding: 1.25rem;
  align-items: center;
  gap: 0.625rem;
  justify-content: space-between;
  background: ${({ theme }) => theme.background};
  height: 4.875rem;
`;

export const ArrowBtnDiv = styled.div``;

export const TitleText = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02875rem;
  margin: 0;
  padding: 0;
`;

export const TitleTextInput = styled.input`
  color: ${({ theme }) => theme.secondaryText};
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02875rem;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
`;

export const BtnWrp = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;
export const ButtonWpr = styled.div`
  display: flex;
  gap: 0.6875rem;
  align-items: center;
`;

export const CrossButtonWrp = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 1rem;
  border-radius: 0.5rem;
  background: #fff;
  transform: rotate(180deg);
`;
export const CircularLoadingWrap = styled.div`
  height: 2.3194rem;
  width: 7.835rem;
  border: 1px solid rgb(103, 94, 242);
  border-radius: 0.3125rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const animateLoader = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;
export const DownloadingLoader = styled.div`
  border: 0.25rem solid #f3f3f3;
  border-top: ${({ theme }) => `0.25rem solid ${theme.primary}`};
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  animation: ${animateLoader} 1s linear infinite;
`;

export const SaveNewsLetterwpr = styled.form`
  padding: 1rem 1.875rem 1.875rem 1.875rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Titlewpr = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.secondaryText};
`;
export const Labelbox = styled.div`
  width: 100%;
  & > span {
    display: inline-flex;
    margin-bottom: 0.44rem;
    color: ${({ theme }) => theme.darkText};
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.01625rem;
  }
  margin-bottom: 1.25rem;
`;
export const Labelwpr = styled.label`
  box-sizing: border-box;
  background: ${({ theme }) => theme.background};
  border-radius: 0.375rem;
  border: 1px solid #c3c7d9;
  display: flex;
  align-items: center;
  padding: 0 0.9rem;
  height: 2.5rem;
  width: 100%;
`;
export const Inputwpr = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.darkText};
  border: none;
  outline: none;
  &::placeholder {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 13px;
    color: #999999;
    text-transform: capitalize;
  }
`;

export const TextAreaContainer = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.9rem;
  background: ${({ theme }) => theme.background};
  height: 3.75rem;
  border-radius: 0.375rem;
  border: 1px solid #c3c7d9;
  resize: none;
  outline: none;
  color: ${({ theme }) => theme.darkText};
  font-family: Inter;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
`;
export const HeaderWrp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.9rem;
  svg {
    cursor: pointer;
  }
`;
