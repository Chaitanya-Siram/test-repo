import styled from 'styled-components';

export const fullWidth = 100;
const margin = 1.5;
export const gap = 0.5;
export const dashboardWidth = 55 - margin;
export const articleWdth = fullWidth - dashboardWidth - margin;
export const buttonWidth = 1.37;
const SlotDetailsWrpGap = 1;
const SlotBodyHeight = 'calc(100% - 4rem) '; // -1*2 added for the gap value

export const SlotTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  width: 95%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const SlotSubTitle = styled.div`
  font-size: 0.8rem;
  color: #585858;
`;
export const SlotBody = styled.div`
  position: relative;
  height: ${SlotBodyHeight};
  width: 100%;
  &.legend,
  &.commentary {
    height: calc(${SlotBodyHeight} - 3rem);
  }

  .unselected {
    transition: all 1000ms ease;
    opacity: 0.2 !important;
  }
`;
export const SlotHeader = styled.div`
  height: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const SlotHeaderLeft = styled.div`
  width: 100%;
`;
export const SlotDetailsMainWrp = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding-bottom: 0.5rem;
  box-sizing: border-box;
`;
export const SlotDetailsWrp = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SlotDetailsWrpGap}rem;
`;
export const SlotFooter = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;
export const LegendSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 3rem;
  overflow-x: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export const CommentarySection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;
export const CommentaryLabel = styled.div`
  text-align: center;
  color: #656b8a;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const IconBox = styled.div`
  cursor: auto;
  position: absolute;
  /* width: 5.75rem; */
  display: flex;
  z-index: 1;
  justify-content: space-between;
  align-items: start;
  top: 0rem;
  right: 0;
  gap: 0.5rem;
`;
export const Iconwpr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ width = '2.25rem', height = '2.25rem' }) => `
  height: ${height};
  width: ${width};
  `}
  cursor: pointer;
  border-radius: 0.25rem;
  position: relative;
`;
export const SlotHeaderRight = styled.div``;
export const GraphTypeBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const GraphTypeBtn = styled.div`
  width: 4.4rem;
  height: 1.3rem;
  padding: 0.4rem 0.66rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #eceff3;
  color: #000;
  font-size: 0.66rem;
  font-weight: 500;
  line-height: 0.66rem;
  letter-spacing: 0.214px;
  transition: all 600ms ease;
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.logoText};
    transition: all 600ms ease;
  }
`;
export const LineShow = styled.div`
  position: absolute;
  top: 0;
  border-left: 1px solid gray;
  height: 100%;
  left: ${(props) => props.xAxis}px;
`;
