import styled from 'styled-components';

export const ThemeContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
`;

export const LabelWrapper = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #585858;
  width: fit-content;
`;

export const BarBoxwrper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const Barwrpr = styled.div`
  display: flex;
  width: ${(props) => props.width};
  gap: 0.25rem;
  justify-content: end;
`;

export const TextBoxwrper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: ${(props) => props.width}%;
  min-width: ${(props) => props.min};
  gap: 0.25rem;
`;

export const Titlewrpr = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #000000;
  & > span {
    margin-top: 4px;
    font-size: 12px;
    line-height: 12px;
  }
`;

export const Textwpr = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  color: #585858;
  display: flex;
  align-items: center;
  :>span  {
    font-size: 14px;
  }
`;

export const Bar = styled.div`
  width: ${(props) => props.width}%;
  height: 15px;
  background: ${(props) => props.color};
  transition: 0.3s ease-all;
`;
