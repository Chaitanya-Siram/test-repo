import styled from 'styled-components';

export const MainWrp = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: ${({ theme }) => theme.newsLetterBackground};
`;
export const DownLoadPdfPageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
