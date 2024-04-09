import styled from 'styled-components';

export const JournalistScoreWrp = styled.div`
  display: flex;
  padding: 1.5625rem 1.375rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.3125rem 0.3125rem 0rem 0rem;
  /* box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08); */
  background-color: #ffffff;
  border-bottom: ${({ theme }) => `2px solid ${theme.newsLetterBackground}`};
`;

export const SubText = styled.p`
  color: #656b8a;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
`;

export const ScoreText = styled.div`
  color: #000;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5625rem; /* 125% */
  letter-spacing: -0.025rem;
  margin: 0;
  padding: 0;
`;
