import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;
export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #c3c7d9;
  padding-bottom: 1rem;
`;
export const HeadingWrp = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
`;
export const MainHeading = styled.p`
  padding: 0;
  margin: 0;
  font-family: Inter;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  text-align: left;
`;
export const SubTypeWrp = styled.p`
  padding: 0;
  margin: 0;
  font-family: Inter;
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.02em;
  text-align: left;
  color: #f54a80;
`;
export const DescWrp = styled.p`
  padding: 0.25rem 0;
  margin: 0;
  width: 60%;
  font-family: Inter;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${({ theme }) => theme.secondaryText};
`;

export const PlainDetailsWrp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StatusWrp = styled.button`
  display: inline-block;
  justify-content: center;
  align-items: center;
  border: none;
  width: 4.125rem;
  height: 2rem;
  border-radius: 0.5rem;
  color: #fff;
  background-color: ${({ activ }) => (activ ? '#61D4A6' : '#F54A80')};
`;

export const ExpWrp = styled.p`
  padding: 0.25rem 0;
  margin: 0;
  font-family: Inter;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.02em;
  text-align: left;
`;
export const DateWrp = styled.span`
  font-family: Inter;
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1rem;
  letter-spacing: -0.02em;
  text-align: left;
`;
export const BottomWrp = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 0.5px solid #c3c7d9;
`;
export const CountWrp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
  align-items: center;
`;
export const ValueWrp = styled.p`
  padding: 0;
  margin: 0;
  font-family: Inter;
  font-size: 1.6875rem;
  font-weight: 700;
  line-height: 2rem;
  letter-spacing: -0.02em;
  text-align: left;
`;
export const TotalWrp = styled.span`
  font-family: Inter;
  font-size: 1.6875rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: -0.02em;
  text-align: left;
`;
export const LabelWrp = styled.p`
  width: 4rem;
  padding: 0.5rem 0;
  margin: 0;
  font-family: Inter;
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1rem;
  letter-spacing: -0.02em;
  text-align: center;
`;
