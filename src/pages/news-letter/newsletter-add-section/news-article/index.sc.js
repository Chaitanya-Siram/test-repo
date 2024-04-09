import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ArticlewprZ = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const ArticleWrapContainer = styled.div`
  width: 100%;
  padding: 1rem 2rem 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  height: calc(100% - 2rem);
  justify-content: space-between;
`;

export const ArticleImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const ArticleLinkWrp = styled.div`
  display: flex;
  align-items: center;
`;

export const Articlekeytxt = styled.div`
  text-decoration: none;
  display: inline-block;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  color: black;
  font-family: Inter;
  font-size: 0.939rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
`;

export const ArticleIcon = styled.img`
  width: 0.9rem;
  height: 0.9rem;
`;
export const BoxArticlewpr = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ArticleLink = styled(Link)`
  text-decoration: none;
  color: var(--grey-grey-2, #585858);
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.015rem;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 5rem;
`;

export const ArticleWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 0.9rem;
  width: 100%;
  padding: 0.5 0;
  &:hover {
    cursor: pointer;
    .article-tool-bar-wrp {
      visibility: visible;
    }
  }
  &::after {
    width: 1.5rem;
    height: 1.5rem;
    background-color: transparent;
    content: '';
    display: block;
    position: absolute;
    left: -17px;
    z-index: 1;
  }
`;

export const ArticleHoverContainer = styled.div`
  display: inline-block;
  position: relative;
  &:hover .add-article-component-${({ idx }) => idx} {
    opacity: 1;
  }
  /* &:hover .article-tool-bar {
    display: flex;
  } */
`;

export const ArticleImageWrap = styled.img`
  width: 20%;
  height: 9rem;
  /* background-image: url(${({ imageUrl }) => imageUrl}); */
  background-size: cover;
  position: relative;
  object-fit: 'cover';
`;
export const ArticleContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: ${({ hideImages }) => (hideImages ? '100%' : '80%')};
  position: relative;
`;

export const ActicleContentTitle = styled(Link)`
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.secondaryText};
  font-family: Inter;
  font-style: normal;
  line-height: 1.5rem;
  letter-spacing: -0.32px;
  text-decoration: underline;
  color: #0563c1;
  font-size: 1.15rem;
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.primary};
  }
`;
export const ActicleContentDescription = styled.div`
  color: ${({ theme }) => theme.black3};
  font-family: Inter;
  font-size: 0.939rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.1875rem;
  letter-spacing: -0.015rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ articleType }) =>
    articleType === 'manual-article' ? 6 : 6};
  text-overflow: ellipsis;
`;

export const SyndicationTextHover = styled.div`
  position: relative;
  display: inline-block;
  &:hover .syndication-text {
    display: block;
  }
`;

export const EditOption = styled.div`
  position: absolute;
  top: -2.1rem;
  left: 0;
  background-color: white;
  color: black;
  box-shadow: 0px 12px 12px 0px #0000001f;
  padding: 0.5rem;
  border: 1px solid var(--others-light, #c3c7d9);
  border-radius: 10px;
  display: none;
`;

export const ArticleDescriptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const SelectedKey = styled.span`
  color: var(--primary-8676-ff, #675ef2);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.02rem;
`;
export const SelectedWord = styled.span`
  color: var(--primary-8676-ff, #675ef2);
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.1875rem;
  letter-spacing: -0.015rem;
`;
export const ToolBarWrp = styled.div`
  visibility: hidden;
  position: absolute;
  top: 0rem;
  left: 6rem;
  width: 3rem;
  height: 7rem;
  display: flex;
  justify-content: flex-end;
`;

export const ArticleDefaultIconLetter = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cce8;
  color: white;
  border-radius: 6px;
  text-transform: uppercase;
`;
