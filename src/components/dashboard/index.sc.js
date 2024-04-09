import styled from 'styled-components';

export const DashboardPagewpr = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

export const Dashboardwpr = styled.div`
  width: 100%;
  padding: 1rem 1.5rem 1rem 1.5rem;
  height: calc(100vh - 3.5rem);
  cursor: default;
`;

export const DashboardHeader = styled.div`
  width: 100%;
  background: #fff;
  padding: 1.25rem;
  margin: auto;
  box-sizing: border-box;
  justify-content: space-between;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
`;

export const LeftWrp = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;
export const RightWrp = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  .dropdownCont {
    height: 26rem;
    overflow-y: auto;
    box-shadow: 0px 10px 20px 0px #00000033;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }
`;
export const HeaderRight = styled.div`
  display: flex;
  padding: 0;
  /* height: 2.2rem; */
  justify-content: baseline;
  align-items: center;
  background: #eceff3;
  border-radius: 4px;
`;

export const HeaderTitlewpr = styled.div`
  font-size: 1.4375rem;
  color: ${({ theme }) => theme.secondaryText};
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.46px;
`;

export const Iconwpr = styled.div`
  display: inline-flex;
  margin-top: 3px;
  &:hover {
    cursor: pointer;
  }
`;

export const DashboardBoxwpr = styled.div`
  padding: 0.75rem 0rem;
  & > div {
    /* padding: 0; */
    /* height: 100%; */
    & #list-container {
      height: 100%;
    }
  }
  position: relative;
  height: calc(100% - 4.25rem);
`;
