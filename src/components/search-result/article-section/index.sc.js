import styled from 'styled-components';

export const fullWidth = 100;
const margin = 1.5;
export const dashboardWidth = 65 - margin;
export const articleWdth = fullWidth - dashboardWidth - margin;

export const ArticleSection = styled.div`
  width: ${({ activeScreen = '' }) =>
    activeScreen === 'article'
      ? `${fullWidth - margin * 2}vw`
      : `${articleWdth - margin}vw`};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /* transform: translateX(
    ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth}vw`
      : activeScreen === 'article'
      ? '0vw'
      : `${dashboardWidth}vw`}
  ); */
  height: 100%;
  background-color: #ffffff;
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
`;
export const Sectionwpr = styled.div`
  width: 100%;
  display: flex;
  height: 2.5rem;
  justify-content: space-between;
  padding: 0rem 1.5rem;
  align-items: center;
`;
export const Paginatewpr = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.secondaryBackground};
  width: 100%;
`;
export const SectionTitle = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

export const LinkSpan = styled.div`
  font-size: 0.875rem;
  max-width: 10rem;
  font-weight: 400;
  width: fit-content;
  color: ${(props) => props.color};
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const HeadingWrp = styled.p`
  color: #161a34;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.4px;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
`;

export const TabButton = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  & > span {
    color: ${({ theme }) => theme.text};
    color: 656B8A;
    margin-left: 0.25rem;
  }
  white-space: nowrap;
`;

export const ThemeTabs = styled.div`
  width: 100%;
  padding: 0.4rem 1.5rem 0.7rem 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const Themetabtxt = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.8125rem;
  font-weight: 600;
  text-align: right;
  font-family: Inter;
  font-style: normal;
  line-height: normal;
`;

export const LoadingWrp = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoResultsWrp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoResultsTitle = styled.div`
  display: flex;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.02em;
  text-align: center;
  /* color: ${({ theme }) => theme.darkText}; */
  color: #000000;
`;

export const NoResultsDesp = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 12px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: -0.02em;
  text-align: center;
  /* color: ${({ theme }) => theme.secondaryText}; */
  color: #585858;
`;

export const ArticleDetialtsWrp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DashboardListwpr = styled.div`
  min-width: ${(props) => props.minWidth || '23%'};
  width: ${(props) => props.width || '23%'};
  height: fit-content;
  overflow: ${(props) => props.overflow || 'hidden'};
  border-radius: 0px 0px 0.625rem 0.625rem;
  background: ${({ theme, bgColor }) => bgColor || theme.secondaryBackground};
  position: relative;
  height: 100%;
  border-radius: 10px 10px 0px 0px;
  margin-left: auto;
`;
