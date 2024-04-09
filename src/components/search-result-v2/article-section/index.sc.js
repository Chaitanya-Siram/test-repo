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
`;

export const ThemeTabs = styled.div`
  width: 100%;
  padding: 0.4rem 1.5rem 0.7rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const Themetabtxt = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.75rem;
  font-weight: 600;
`;
