import styled from 'styled-components';

export const Contentwpr = styled.form`
  display: flex;
  flex-direction: column;
  // gap: 1rem;
  width: 100%;
`;

export const Infowpr = styled.div`
  display: flex;
  box-sizing: border-box;
  background: rgba(103, 94, 242, 0.1);
  border-radius: 10px;
  gap: 0.5rem;
  align-items: center;
  height: 2.5rem;
  width: 100%;
  padding: 0 1.25rem;
`;

export const Infotxt = styled.div`
  font-weight: 600;
  font-size: 0.81rem;
  color: ${({ theme }) => theme.primary};
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
  }
`;

export const TextAreaContainer = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.9rem;
  background: ${({ theme }) => theme.background};
  height: 8.5rem;
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

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.75rem;
`;

export const SwitchBoxwpr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 50%;
  transition: 0.3s ease-in-out;
  height: max-content;
  /* height: ${({ checked }) => (checked ? '9.5rem' : '1.75rem')}; */
`;

export const BoldBoxwpr = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Boldtxt = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #000000;
  display: flex;
  align-items: center;
`;

export const Switchwpr = styled.input`
  appearance: none;
  width: 38px;
  height: 22px;
  border-radius: 10px;
  background-color: #c3cad1;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  margin-bottom: 0.0825rem;
  &:checked {
    background-color: ${({ theme }) => theme.primary};
  }
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.secondaryBackground};
    display: flex;
    align-items: center;
    transition: transform 0.3s ease-in-out;
  }

  &:checked::before {
    transform: translateX(1rem);
  }
`;

export const MidBoxwpr = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
`;

export const MidBoxLeftWrap = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
`;

export const Midtxt = styled.div`
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  color: ${({ theme }) => theme.darkText};
  display: flex;
  align-items: center;
`;

export const PercBoxwpr = styled.div`
  border: 1px solid #c3c7d9;
  width: 3rem;
  height: 1.875rem;
  flex-shrink: 0;
  padding: 1px 0.25rem 0;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: start;
  color: ${({ theme }) => theme.primary};
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.01625rem;
  gap: 0;
  span {
    width: 100%;
  }
`;

export const PercInputwpr = styled.input`
  box-sizing: border-box;
  width: 100%;
  background: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.01625rem;
  outline: none;
  border: none;
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* Rest of the browsers */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  margin: 0;
  padding: 0;
`;

export const Descwpr = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  width: 100%;
  color: #999999;
  word-break: break-word;
`;

export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  box-sizing: border-box;
  min-width: 1rem;
  min-height: 1rem;
  background-color: #ffffff;
  border: 1.5px solid #2e68ff;
  margin: 0;
  border-radius: 4px;
  &:checked {
    accent-color: #675ef2;
    width: 1rem;
    height: 1rem;
    border: 1.5px solid #675ef2;
    border-radius: 4px;
  }
  &:hover {
    accent-color: #675ef2;
  }
`;
export const HeaderWrp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  svg {
    cursor: pointer;
  }
`;
export const CheckBoxesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.59rem;
  align-items: flex-start;
`;
export const TogglePauseWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 0.59rem;
  align-items: center;
  margin-top: 1rem;
`;
export const PauseOptionLabel = styled.div`
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  color: ${({ theme }) => theme.secondaryText};
`;

export const IconWrp = styled.div``;
