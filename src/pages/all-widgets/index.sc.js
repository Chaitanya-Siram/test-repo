import styled from 'styled-components';

export const SlotBorder = styled.div`
  border: 1px solid grey;
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  height: 100%;
`;

export const UberStatsWrp = styled.div`
  width: ${({ slotType }) =>
    slotType === 'half' ? 'calc(50% - 0.5rem)}' : '100%'};
  border-radius: 20px;
  padding: 1rem;
  background-color: #ffffff;
  cursor: pointer;
  z-index: ${({ selected }) => (selected ? 1 : null)};
  border: 1px solid grey;
`;
