import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const Header = styled.div`
  font-size: 1.02rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: flex-end;
`;
export const SelectAll = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.75rem;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;
export const Widgets = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
`;
export const Widget = styled.div`
  border: 1px solid
    ${({ theme, selected }) => (selected ? theme.primary : '#E8E8E8')};
  padding: 1.188rem 1.25rem;
  font-size: 0.938rem;
  font-weight: 600;
  height: 120px;
  width: 10.75rem;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    border: 1px solid ${({ theme }) => theme.primary};
  }
  background-color: ${({ theme, selected }) =>
    selected ? theme.primary : '#fff'};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 2px 4px 0px #00000014;
`;

export const WidgetIconWrapper = styled.div`
  width: 18px;
  height: 14px;
  > svg {
    stroke: #fff;
  }
`;

export const WidgetHeaderWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export const WidgetHeader = styled.div`
  font-weight: 600;
  font-size: 0.75rem;
  width: 85%;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0.4rem 0;
  border-top: 1px solid #c3c7d9;
`;
export const WidgetDesc = styled.div`
  font-size: 10px;
  font-weight: 400;
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 120px;
`;

export const WidgetTooltipWrapper = styled.div`
  /* border: 1px solid ${({ theme }) => theme.primary}; */
  border-radius: 6px;
  width: 260px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const WidgetTooltipImage = styled.img`
  width: 80%;
  height: 100%;
`;

export const WidgetGroup = styled.div`
  background: #fff;
  padding: 1.25rem;
  border-radius: 0.625rem;
`;
