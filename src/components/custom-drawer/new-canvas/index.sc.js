import styled from 'styled-components';

export const Sublablewpr = styled.div`
  font-weight: 500;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.darkText};
  margin-bottom: 0.44rem;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
`;

export const InputLabelBox = styled.div`
  width: 100%;
  padding: 1rem;
  background: #ffffff;
  border-radius: 0.625rem;
`;

export const InputLabelwpr = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  background: #ffffff;
  border: 1px solid #d1d5dc;
  padding: 0.6rem 0.75rem;
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const Inputwpr = styled.input`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.8125rem;
  width: 100%;
  height: 100%;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
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

export const CavasTypewpr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25rem;
  gap: 1rem;
  width: 100%;
  border-radius: 0.625rem;
  margin-bottom: -0.5rem;
  background-color: #ffffff;
`;

export const CanvasTypelabelwpr = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #000000;
`;

export const CanvasContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const CanvasBoxwpr = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 10px;
  aspect-ratio: 1.5/1;
  width: 10.75rem;
  gap: 0.25rem;
  padding: 0.95rem 1.1rem;
  background: ${({ checked, theme }) =>
    checked ? theme.primary : theme.secondaryBackground};
  margin-bottom: 0.5rem;
  border: ${({ checked, theme }) =>
    checked ? `3px solid ${theme.primary}` : '1px solid #999999'};
  & .writeicon {
    display: ${({ checked }) => (checked ? 'flex' : 'none')};
  }
  & > div > svg > path {
    stroke: ${({ checked, theme }) => (checked ? theme.text : '#999999')};
  }
  &:hover {
    border: ${({ checked, theme }) =>
      checked ? '' : `3px solid ${theme.primary}`};
    & .writeicon {
      display: ${({ checked }) => (checked ? '' : 'flex')};
    }
    & > div > svg > path {
      stroke: ${({ checked }) => (checked ? '' : '#999999')};
    }
  }
  & div,
  > div > span {
    color: ${({ checked, theme }) => (checked ? theme.text : '')};
  }
  transition: 0.2s ease-in-out;
  position: relative;
`;
export const TopWrp = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
`;
export const ChipText = styled.div`
  width: fit-content;
  padding: 0.2rem 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.65rem;
  color: white;
  background-color: ${({ bgcolor }) => bgcolor};
`;
export const CanvasTitlewpr = styled.div`
  font-weight: 700;
  font-family: Inter;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.secondaryText};
`;

export const CanvasDescriptionwpr = styled.div`
  font-weight: 400;
  font-size: 0.6rem;
  color: #999999;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
  padding: 0.8rem 0rem;
`;

export const SubTitlewpr = styled.div`
  display: flex;
  align-items: end;
  flex: 1;
  font-weight: ${(props) => props.fontWeight};
  /* font-size: 0.83rem; */
  font-size: 0.625rem;
  color: ${({ theme }) => theme.secondaryText};
  & > span {
    font-size: 0.75rem;
    font-weight: 400;
    margin-left: 0.2rem;
    color: #999999;
  }
`;
export const RadioLabel = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  gap: 0.2rem;
  margin-right: 10px;
  font-weight: 700;
  font-size: 1rem;
  color: ${({ checked, theme }) =>
    checked ? theme.primary : theme.secondaryText};
`;
export const RadioInput = styled.input.attrs({ type: 'radio' })`
  &:hover {
    cursor: pointer;
  }
  &:checked {
    border: ${({ theme }) => `2px solid ${theme.primary}`};
    background-color: ${({ theme }) => theme.primary};
    accent-color: ${({ theme }) => theme.primary};
  }
`;
export const MainRadioWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
