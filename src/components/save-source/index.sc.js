import styled from 'styled-components';

export const Contentwpr = styled.form`
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
export const IconWrp = styled.div``;
