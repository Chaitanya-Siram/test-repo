import styled from 'styled-components';

export const fullWidth = 100;
const margin = 1.5;
export const dashboardWidth = 65 - margin;
export const articleWdth = fullWidth - dashboardWidth - margin;
export const buttonWidth = 1.25;

export const DashboardSection = styled.div`
  width: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth - margin * 2}vw`
      : `${dashboardWidth}vw`};
  height: 100%;
  padding: 1.5rem;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
  background-color: #eceff3;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000044;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
`;
export const DashboardInnerSection = styled.div`
  height: calc(100% - 4rem);
  overflow: ${({ selected }) => (selected ? 'hidden' : 'auto')};

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const DropHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 3rem;
  margin-bottom: 1rem;
`;
export const FullSlot = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 20px;
  padding: 1rem;
  background-color: #ffffff;
  cursor: pointer;
  z-index: ${({ selected }) => (selected ? 1 : null)};
`;
export const HalfSlot = styled.div`
  height: 20rem;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 1rem;
  width: calc(50% - 0.5rem);
  cursor: pointer;
  z-index: ${({ selected }) => (selected ? 1 : null)};
`;
export const Iconwpr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.35rem;
  cursor: pointer;
  &:hover {
    background: #eceff3;
  }
  border-radius: 5px;
`;
export const UserTilesMainWrp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  background: #fff;
  padding: 1.188rem;
  gap: 0.625rem;
`;

export const UberTextTitle = styled.p`
  color: #000;
  font-size: 0.813rem;
  font-family: Inter;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

export const UberTilesWrp = styled.div`
  width: 100%;
  display: flex;
  gap: 4.75rem;
`;

export const SlotWrp = styled.div`
  position: relative;
  margin: 1rem 0rem 2rem 0rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .y.axis > .domain {
    display: none;
  }

  .y.axis > .tick > .y-axis-line {
    display: block;
  }

  .y.axis > .tick > text,
  .x.axis > .tick > text {
    fill: #585858;
    font-size: 0.6rem;
    font-family: ${({ theme }) => theme.fontFamily};
     text-transform: capitalize;
  }
  .x.axis > .domain {
    stroke: #999999;
  }
`;
