import styled from 'styled-components';

export const PRImpactWrp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const PRImpactDetails = styled.div`
  position: absolute;
  top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60%;
  justify-content: flex-end;
`;

export const ValueContent = styled.div`
  font-weight: 600;
  font-size: 1rem;
`;

export const Title = styled.div`
  font-size: 0.75rem;
`;

export const SubTitle = styled.div`
  font-size: 0.5rem;
  color: #585858;
`;

export const LegendsWrp = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: fit-content;
  margin-top: 0.5rem;
`;
export const LegendWrp = styled.div``;
export const Legend = styled.div`
  font-weight: 600;
  font-size: 0.65rem;
  color: #585858;
  display: flex;
  align-items: center;
`;
export const LegendIndicator = styled.span`
  background-color: ${({ color = '' }) => color};
  font-weight: bold;
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.25rem;
`;
export const LegendDesc = styled.div`
  font-size: 0.65rem;
  color: #585858;
`;

export const PrImpactContainer = styled.div`
  width: 10%;
  height: 100%;
  position: relative;
`;
