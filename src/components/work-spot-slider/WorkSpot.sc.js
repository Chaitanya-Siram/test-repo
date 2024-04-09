import styled from 'styled-components';

export const WorkSpotwpr = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (!props?.issEmptyState ? 'column' : 'row')};
  flex-wrap: ${(props) => (!props?.isEmptyState ? 'wrap:' : 'no-wrap')};
  flex-wrap: wrap;
  position: relative;
  overflow-x: auto;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  place-content: flex-start;
  &::-webkit-scrollbar {
    display: none;
  }
  background: transparent;
`;
