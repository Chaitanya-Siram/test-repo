import styled from 'styled-components';

export const Article = styled.div`
  display: flex;
  padding: 1.375rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-bottom: 2px solid var(--greys-g-01, #eceff3);
`;

export const ArticleTitle = styled.h3`
  width: 81.5%;
  color: #000;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
  letter-spacing: -0.02125rem;
  margin: 0;
  padding: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ArticleContent = styled.p`
  color: #343637;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3125rem;
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ArticleSubText = styled.p`
  color: #343637;
  font-size: 0.6875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3125rem;
  letter-spacing: -0.01375rem;
  margin: 0;
  padding: 0;
`;

export const ReachWrp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`;

export const ReachText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
`;
