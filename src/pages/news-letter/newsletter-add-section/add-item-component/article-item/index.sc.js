import styled from 'styled-components';

export const ArticleWrp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 800px;
  height: 280px;
  background: url(${(prop) => prop.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center, center;
  margin: 10px 0px;
  padding: 20px 30px;
`;

export const ArticleContentWrp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 694px;
`;

export const ArticleTitle = styled.h3`
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
`;

export const ArticleTags = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 7px;
  color: #ffffff;
`;
