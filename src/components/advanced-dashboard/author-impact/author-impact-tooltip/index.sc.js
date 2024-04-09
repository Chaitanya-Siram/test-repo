import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  width: 50rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.background};
  padding: 1.25rem;
`;
export const TooltipTitle = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 0.5rem;
  color: #585858;
  text-transform: capitalize;
  text-align: center;
`;
export const SlotDetailsWrp = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
export const SlotBody = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  .unselected {
    transition: all 1000ms ease;
    opacity: 0.2 !important;
  }
`;
export const SlotBodyMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const SlotGraphItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const LegendWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
