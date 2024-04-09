import styled from 'styled-components';

export const MainWrp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(246, 247, 251);
  border-radius: 0.75rem;
  padding: 1rem 1.875rem;
`;
export const HeaderSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(246, 247, 251);
  border-radius: 0.75rem;
  padding-bottom: 0.5rem;
`;
export const HeadingWrp = styled.div`
  font-weight: 700;
  font-style: Inter;
  font-size: 1.25rem;
`;
export const IconWrp = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  &:hover {
    cursor: pointer;
  }
`;

export const DescritptionWrp = styled.p`
  font-size: 0.875rem;
  text-align: center;
  font-family: Inter;
  font-weight: 400;
  line-height: 1rem;
`;

export const ButtonWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
export const ButtonCmp = styled.button`
  padding: 0.813rem 1.563rem;
  font-size: 0.9rem;
  line-height: 1rem;
  font-family: Inter;
  font-weight: 600;
  border: ${({ outline }) => (outline ? '1px solid #535770' : 'none')};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.primary : '#FFFFFF'};
  border-radius: 5px;
  color: ${({ backgroundColor }) => (backgroundColor ? '#FFFFFF' : '#161A34')};
  &:hover {
    cursor: pointer;
  }
`;
