import styled from 'styled-components';
import { dashboardWidth, fullWidth } from '../article-graphs/index.sc';

const margin = 1.5;

export const DashboardSection = styled.div`
  width: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth - margin * 2}vw`
      : `${dashboardWidth}vw`};
  overflow: hidden;
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
  background-color: #eceff3;
  &::-webkit-scrollbar {
    display: none;
  }
`;
