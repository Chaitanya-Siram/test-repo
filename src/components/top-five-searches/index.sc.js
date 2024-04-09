import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainWrp = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  cursor: default;
`;

export const TabTitle = styled.h3`
  color: #000;
  font-size: 0.875rem;
  /* font-family: Manrope; */
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.731rem;
`;

export const ArticlesWrp = styled.div`
  height: calc(100% - 1.625rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.688rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ArticleWrp = styled(Link)`
  width: 100%;
  display: flex;
  text-decoration: none;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0;
`;

export const ArticleWrpL = styled.div`
  cursor: pointer;
`;
export const ArticleWrpR = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.563rem;
`;

export const ArticleImg = styled.img`
  width: 4.875rem;
  height: 4.375rem;
  object-fit: cover;
`;

export const TitleText = styled.p`
  font-style: normal;
  cursor: pointer;
  /* font-family: Manrope; */
  line-height: 0.813rem;
  margin: 0;
  color: #000000;
  font-size: 0.625rem;
  font-weight: 500;
`;

export const SubTextWrp = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DescrText = styled.div`
  font-style: normal;
  height: 2.063rem;
  font-weight: 400;
  font-size: 0.563rem;
  /* font-family: Manrope; */
  line-height: 0.688rem;
  color: #555555;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
