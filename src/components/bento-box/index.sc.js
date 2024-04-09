import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
export const GridContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  padding: 1rem 1.5rem;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export const GridContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.gridGap || 1}rem;
  width: fit-content;
  height: 100%;
`;
export const GridCol = styled.div`
  width: ${(props) => props.colWidth || '10'}rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gridGap || 1}rem;
  transition: all 0.3s ease-in-out;

  &.active {
    width: ${(props) => props.activeColWidth || '17.5'}rem;
    .box.active {
      height: ${(props) => `calc(75% - ${props.gridGap || 1}rem)`};
    }
    .box.inactive {
      height: ${(props) => `calc(25% - ${props.gridGap || 1}rem)`};
    }
  }
`;
export const GridBox = styled.div`
  width: 100%;
  height: ${(props) => `calc(50% - ${props.gridGap || 0.5}rem)`};
  padding: 1.55rem;
  background: #ffffff;
  box-shadow: 0px 5px 10px rgba(108, 73, 172, 0.1);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;
export const IconButton = styled.div`
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 10px;
  z-index: 1;
  cursor: pointer;
  &.left-arrow {
    left: 10px;
  }

  &.right-arrow {
    right: 10px;
  }
  &.hidden {
    display: none;
  }
`;

export const BoxHeader = styled.div`
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BoxTitle = styled.div`
  font-size: 1.15rem;
  font-weight: 600;
  color: #000;
`;

export const BoxBody = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BoxLoadingWrp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
