import styled, { keyframes } from 'styled-components';

// dropdown sc
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
export const DropdownContainer = styled.div`
  position: relative;
  min-width: max-content;
  width: ${(props) => (props.newWidth ? `${props.newWidth}rem` : '100%')};
  height: 2.125rem;
  box-sizing: border-box;
  border-radius: 0.3125rem;
  border: 1px solid #dedede;
`;

export const DropdownButton = styled.button`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.background};
  border-radius: 0.375rem;
  border-color: ${({ active }) => (active ? '#000000' : 'transparent')};
  border-width: ${({ borderWidth }) => borderWidth}px;
  padding: 0.62rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.44rem;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  color: ${({ theme }) => theme.secondaryText};
  white-space: nowrap;
`;
export const CountIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6875rem;
`;
export const DropdownList = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 2.5rem;
  z-index: 1;
  background: #ffffff;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  /* border: 1px solid #000000; */
  border-radius: 0.375rem;
  list-style-type: none;
  padding: 0;
  /* padding-top: 0.375rem;
  padding-bottom: 0.625rem; */
  margin: 0;
  width: 100%;
  min-width: max-content;
  /* max-height: 14.5rem; */
  display: ${({ open }) => (open ? 'block' : 'none')};
  animation: ${({ open }) => (open ? fadeIn : fadeOut)} 600ms ease-in-out;
`;
// dropdown sc ends
export const FilterWrapper = styled.div`
  width: 19rem;
  height: fit-content;
  flex-shrink: 0;
  padding: 1.5rem;
`;
export const FilterHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FilterTitle = styled.div`
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const IconWrp = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;
export const BorderDiv = styled.div`
  width: 100%;
  height: 0.0625rem;
  opacity: 0.5;
  background: ${({ theme }) => theme.borders};
  margin: 0.62rem 0;
`;
export const FilterBody = styled.div`
  width: 100%;
  height: 14rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.62rem 0;
`;
export const FilterItemWrp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const FilterFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;
export const DropdownWrp = styled.div`
  width: 100%;
  height: fit-content;
  background: ${({ theme }) => theme.background};
`;
export const SelectedItemsContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  max-height: calc(3 * 1.75rem + 0.3rem);
  overflow: hidden;
`;
