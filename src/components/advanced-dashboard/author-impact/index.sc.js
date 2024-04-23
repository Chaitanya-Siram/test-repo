import styled from 'styled-components';

const SlotBodyHeight = 'calc(100% - 5rem)';
const SlotDetailsWrpGap = 0.5;

export const FullSlot = styled.div`
  width: 100%;
  height: 30rem;
  border-radius: ${({ theme }) => theme.primaryBorderRadius};
  padding: 1rem;
  background-color: #ffffff;
  cursor: pointer;
  border: 2px solid ${({ selected }) => (selected ? 'blue' : 'none')};
  z-index: ${({ selected }) => (selected ? 1 : null)};
`;

export const SlotDetailsMainWrp = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding-bottom: 0.5rem;
  box-sizing: border-box;
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
export const SlotDetailsWrp = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SlotDetailsWrpGap}rem;
`;
export const SlotHeader = styled.div`
  height: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const SlotHeaderLeft = styled.div`
  width: 100%;
`;
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
    height: calc(${SlotBodyHeight} - 2rem);
  }

  .selected {
    transition: all 400ms ease;
    opacity: 1 !important;
  }

  .unselected {
    transition: all 400ms ease;
    opacity: 0.2 !important;
  }

  .hover-selected {
    transition: all 400ms ease;
    opacity: 1 !important;
  }
  .hover-unselected {
    transition: all 400ms ease;
    opacity: 0.2 !important;
  }
  .word-cloud-text {
    font-weight: 700;
  }
`;
export const SlotBodyMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;
export const SlotGraphItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const ChartName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-transform: capitalize;
`;
export const SlotFooter = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;
