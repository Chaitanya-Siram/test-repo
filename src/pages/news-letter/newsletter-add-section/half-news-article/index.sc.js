import styled from 'styled-components';

export const ArticleWrap = styled.div`
  width: 100%;
  display: flex;
  height: 24rem;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  position: relative;
  align-items: flex-end;
`;

export const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: transparent;
  padding: 1.18rem 1.4rem;
`;

export const ArticleTitle = styled.div`
  color: ${({ theme }) => theme.background};
  font-size: 1.04713rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.23194rem;
  letter-spacing: -0.0105rem;
`;

export const ArticleContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
export const ArticleKeysWrp = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const ArticleKeyText = styled.div`
  color: ${({ theme }) => theme.background};
  font-size: 0.80075rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.98556rem;
  opacity: 0.7;
`;
export const ArticleKeywordsText = styled.div`
  color: ${({ theme }) => theme.background};
  font-size: 0.80075rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.98556rem;
  opacity: 0.7;
`;
