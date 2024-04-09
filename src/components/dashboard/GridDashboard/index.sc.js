import styled, { keyframes, css } from 'styled-components';
import {
  ArticleSection,
  buttonWidth,
  dashboardWidth,
  fullWidth,
} from '../../search-result/index.sc';

export const DashbordCmnentwpr = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  gap: 0.75rem;
  height: 100%;
`;
export const CreateDBBtnWrp = styled.div`
  position: absolute;
  overflow: hidden;
  top: ${({ top = '11rem' }) => top};
  box-shadow: 0px 5px 10px rgba(108, 73, 172, 0.1);
  left: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth - buttonWidth}vw`
      : `${dashboardWidth - 0.5}vw`};
  background-color: #fff;
  height: 1.875rem;
  border: 2px solid #675ef2;
  border-left: none;
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transform: ${({ activeScreen }) =>
    activeScreen === 'dashboard' ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const CreateDBBtn = styled.button`
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

export const DashbrdGraphconrwpr = styled.div`
  width: ${({ activeScreen }) =>
    activeScreen === 'dashboard'
      ? 'calc(80% - 0.5rem)'
      : 'calc(43.5% - 1.5rem)'};
  height: 100%;
  /* overflow-y: scroll; */
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
  & #download-content {
    height: 100%;
  }
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DashboardGraphheaderwpr = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 0.625rem;
  background: #fff;
  margin-bottom: 0.625rem;
  padding: 1.25rem;
`;

export const HeaderLeft = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const Titletxtwpr = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.25rem;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem;
  letter-spacing: -0.17px;
`;

export const IconsBoxwpr = styled.div`
  display: flex;
  /* gap: 0.75rem; */
`;

export const Iconwpr = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.primary};
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.26px;
  color: #675ef2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  width: fit-content;
  height: 2.25rem;
  /* height: fit-content; */
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #675ef2;
  background: #fff;
  &:hover {
    transition: background 0.2s ease;
    background: #857ef5;
    color: #fff;
    > svg > g > path {
      stroke: #fff;
    }
  }

  &:active {
    background: #524bc2;
  }
`;
export const TextWrp = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.primary};
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.26px;
`;

export const GraphContainer = styled.div`
  overflow: auto;
  height: 100%;
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
  width: calc(40vw - 1.5rem);
  height: 92.5vh;
  top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 20;
  justify-content: space-between;
  ${({ articlePosition }) =>
    articlePosition === 'left'
      ? css`
          animation: ${slideOutAnimation} 600ms ease;
          left: 24.6vw;
          flex-direction: row-reverse;
        `
      : articlePosition === 'right'
      ? css`
          animation: ${slideAnimation} 600ms ease;
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
  width: 1.25rem;
  height: 1.25rem;
  align-items: center;
  justify-content: center;
  left: ${({ articlePosition }) =>
    articlePosition === 'left' ? 'calc(50% - 1rem)' : 'calc(50% - 0.25rem)'};
  z-index: 10;
  background-color: #fff;
  border-radius: 50%;
`;
