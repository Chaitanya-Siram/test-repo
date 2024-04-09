import styled from 'styled-components/macro';

export const MainWrp = styled.div`
  height: calc(100vh - 5rem);
  overflow: auto;
  border-radius: 0.625rem 0.625rem 0rem 0rem;
  margin: 1rem 2.2rem;
  box-shadow: 0px 1px 0px 0px #e8e8e8;
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
  background-color: ${({ theme }) => theme.newsLetterBackground};
`;

export const TopMainWrp = styled.div`
  position: relative;
  top: 0;
  /* bottom: 0; */
  /* left: 0; */
  /* right: 0;/ */
  z-index: 1; /* Ensure it appears above scrolling content */
`;

export const BodyWrp = styled.div`
  height: calc(100% - 12rem);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  top: 0;
`;
