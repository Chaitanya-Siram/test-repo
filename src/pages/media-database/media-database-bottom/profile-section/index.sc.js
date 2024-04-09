import styled from 'styled-components';

const gridGap = 0.9375;

export const MainWrp = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  align-content: flex-start;
  gap: ${gridGap}rem;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.newsLetterBackground};
  padding-top: 0.9375rem;
`;
export const CardWrp = styled.div`
  position: relative;
  min-height: 27.3rem;
  max-height: fit-content;
  cursor: pointer;
  &:nth-child(4) .right-card {
    left: calc(-100% - ${gridGap - 0.5}rem);
  }
`;
export const DeleteMainWrp = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  gap: 0.5rem;
  padding: 0rem 0.9375rem;
  outline: 1px solid black;
  background: #161a34;
  z-index: 30;
  border-radius: 0.3125rem;
  left: 2.5rem;
  bottom: 4rem;
  cursor: pointer;
`;
export const FrontDiv = styled.div`
  width: 100%;
  height: 100%;
`;
export const RightDiv = styled.div`
  width: 100%;
  visibility: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: calc(100% + ${gridGap - 0.5}rem);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s;
`;
