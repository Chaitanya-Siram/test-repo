import styled, { keyframes, css } from 'styled-components/macro';
import { ArticleSection } from '../search-result/index.sc';

export const fullWidth = 100;
const margin = 1.5;
export const gap = 0.5;
export const dashboardWidth = 65 - margin;
export const articleWdth = fullWidth - dashboardWidth - margin;
export const buttonWidth = 1.37;

export const SearchMainWrp = styled.div`
  height: 100%;
  overflow: hidden;
  &.p-relative {
    position: relative;
  }

  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

export const BtnWrp = styled.div`
  position: absolute;
  overflow: hidden;
  top: ${({ top = '8.5rem' }) => top};
  box-shadow: 0px 5px 10px rgba(108, 73, 172, 0.1);
  left: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth - buttonWidth}vw`
      : activeScreen === 'article'
      ? `${-1.1 * buttonWidth}vw`
      : `${dashboardWidth + gap - 1 / 2}vw`};
  background-color: #fff;
  height: 1.875rem;
  width: 2.75rem;
  border: 2px solid #675ef2;
  border-radius: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const Btn = styled.button`
  border: none;
  width: ${`${buttonWidth}rem`};
  height: 105%;
  padding: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &.inactive {
    background-color: #675ef2;
    color: #fff;
  }

  &:hover > svg > path {
    stroke: #fff;
  }
`;

export const SearchResultWrp = styled.div`
  /* height: calc(100vh - 11.5rem); */
  width: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth + articleWdth + margin * 2}vw`
      : activeScreen === 'article'
      ? `${fullWidth + dashboardWidth + margin * 2}vw`
      : '100vw'};
  height: 100%;
  transform: ${({ activeScreen = '' }) =>
    activeScreen === 'article'
      ? `translateX(${-1 * (dashboardWidth + margin * 2)}vw)`
      : 'none'};
  display: flex;
  padding: 0 1.5rem;
  position: relative;
  gap: ${({ activeScreen = '' }) =>
    activeScreen !== '' ? `${margin * 2}rem` : `${gap}rem`};
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const slideAnimation = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;
const slideOutAnimation = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

export const ArticleSectionComponentWrp = styled.div`
  position: fixed;
  width: calc(51vw - 0.75rem);
  height: 93vh;
  top: 3.75rem;
  display: flex;
  gap: 0.5rem;
  z-index: 20;

  ${({ articlePosition }) =>
    articlePosition === 'left'
      ? css`
          animation: ${slideOutAnimation} 1s ease;

          left: 1.5rem;
          flex-direction: row-reverse;
        `
      : articlePosition === 'right'
      ? css`
          animation: ${slideAnimation} 1s ease;
          right: 1.5rem;
          flex-direction: row;
        `
      : css`
          transition: opacity 400ms ease-in, transform 10ms 400ms ease-in,
            flex-direction 10ms 400ms ease-in, right 10ms 400ms ease-in;
          opacity: 0;
          right: 100%;
          transform: translateX(-100%);
          flex-direction: row;
        `}
  ${({ activeScreen }) =>
    activeScreen !== '' &&
    `
    ${ArticleSection} {
      padding: 0.25rem 0;
    }
  `};
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  left: ${({ articlePosition }) =>
    articlePosition === 'left' ? 'calc(50%)' : 'calc(50% - 1.25rem)'};
  z-index: 10;
  background-color: #fff;
  border-radius: 100%;
`;
