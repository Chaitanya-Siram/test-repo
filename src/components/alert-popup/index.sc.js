import styled from 'styled-components';

export const MainWrp = styled.div`
  width: 28rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 0.625rem;
  padding: 1rem 1.875rem;
`;
export const HeaderSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 0.75rem;
`;
export const DescMainWrp = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  padding: 1rem 0;
`;
export const HeadingWrp = styled.div`
  font-weight: 700;
  font-style: Inter;
  font-size: 1.25rem;
  line-height: 25px;
  letter-spacing: -0.4px;
`;
export const IconWrp = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export const DescritptionWrp = styled.p`
  width: 70%;
  font-size: 0.875rem;
  text-align: left;
  font-family: Inter;
  font-weight: 400;
  line-height: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  padding: 0;
  margin: 0;
  color: #000;
`;

export const ButtonWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.625rem 0;
`;
export const ButtonCmp = styled.button`
  padding: 0.8125rem 1.5625rem;
  font-size: 0.9rem;
  line-height: 1rem;
  font-family: Inter;
  font-weight: 600;
  border: ${({ outline }) => (outline ? '1px solid #535770' : 'none')};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.primary : '#FFFFFF'};
  border-radius: 0.5rem;
  color: ${({ backgroundColor }) => (backgroundColor ? '#FFFFFF' : '#161A34')};
  &:hover {
    cursor: pointer;
    background-color: #857ef5;
    color: #ffffff;
  }
`;
