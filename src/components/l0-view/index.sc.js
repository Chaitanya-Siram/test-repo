import styled from 'styled-components';

export const SummaryViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const SummaryContent = styled.div`
  width: 100%;
  height: 100%;
`;
export const SummaryTitle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.9rem;
  font-weight: 700;
`;
export const SummaryValuesCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0.25rem;
`;
export const SubTextLabel = styled.div`
  color: #585858;
  font-size: 0.6875rem;
`;
export const SummaryValue = styled.div`
  color: #000;
  font-size: 1.25rem;
  font-weight: 700;
`;
