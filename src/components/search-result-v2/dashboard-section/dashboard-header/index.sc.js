import styled from 'styled-components';

export const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.3125rem 0.3125rem 0rem 0rem;
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 1px 0px 0px #e8e8e8;
`;
export const TabsContainer = styled.div`
  width: 80%;
  height: fit-content;
`;
export const TabContentContainer = styled.div`
  position: relative;
  width: 100%;
  z-index: 5;
  &.fold {
    overflow: hidden;
  }
`;
export const ComponentWrp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 5px 10px rgba(108, 73, 172, 0.1);
  border-radius: 0 0 0.3125rem 0.3125rem;
`;
export const IconWrp = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.375rem;
  cursor: pointer;
`;
