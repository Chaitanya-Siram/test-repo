import styled from 'styled-components';

export const ArticlesWrp = styled.div`
  display: flex;
  padding: 1.5625rem 2rem;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  background-color: #ffffff;
  border-radius: 0.3125rem;
  border-bottom: ${({ theme }) => `2px solid ${theme.newsLetterBackground}`};

  /* box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08); */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1875rem;
  justify-content: flex-start;
  height: fit-content;
`;

export const ArticleType = styled.p`
  color: var(--grey-grey-1, #656b8a);

  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
`;

export const ArticleNumber = styled.p`
  color: #000;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem; /* 117.647% */
  letter-spacing: -0.01063rem;
  margin: 0;
  padding: 0;
`;
