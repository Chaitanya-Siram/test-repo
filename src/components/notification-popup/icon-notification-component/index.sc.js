import styled from 'styled-components';

export const MainWrp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3125rem;
  align-self: stretch;
  &:hover {
    cursor: pointer;
  }
`;

export const TitleWrp = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const TitleText = styled.h4`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
`;

export const NotificationDot = styled.div`
  width: 0.375rem;
  height: 0.375rem;
  background-color: #4377ff;
  border-radius: 50%;
`;

export const ContentWrp = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  padding: 0.625rem 0rem;
  align-items: center;
  gap: 0.625rem;
`;

export const ContentText = styled.p`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.secondaryText};

  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
`;

export const TimeWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;

export const TimeText = styled.p`
  color: #999;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
  padding: 0;
  margin: 0;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.0625rem;
  background: #e8e8e8;
  margin-top: 0.5rem;
`;
