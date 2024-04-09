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
  /* min-width: max-content; */
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
  /* position: absolute;
  left: 0;
  top: 2.5rem; */
  z-index: 1;
  background: #ffffff;
  /* box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2); */
  /* border: 1px solid #000000; */
  border-radius: 0.375rem;
  list-style-type: none;
  padding: 0;
  padding-top: 0.375rem;
  padding-bottom: 0.625rem;
  margin: 0;
  width: ${(props) => (props.newWidth ? `${props.newWidth}rem` : '100%')};
  min-width: max-content;
  /* max-height: ${({ dropdownListHeight }) => `${dropdownListHeight}rem`}; */
  height: auto;
  display: ${({ open }) => (open ? 'block' : 'none')};
  animation: ${({ open }) => (open ? fadeIn : fadeOut)} 600ms ease-in-out;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export const DropdownListItem = styled.li`
  height: 2rem;
  padding: 0.5rem 0.938rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.813rem;
  &:hover,
  &.selected {
    color: ${({ theme }) => theme.primary};
  }
  &.dropdown-search {
    padding: 0.2rem 0.938rem;
  }
`;
export const OptionTitle = styled.span`
  font-size: 0.813rem;
  line-height: 1rem;
`;
export const ListWrp = styled.div`
  position: absolute;
  right: 0;
  top: 2.5rem;
  width: fit-content;
  background-color: #ffffff;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  /* &.custom {
    width: fit-content;
  } */
`;
export const FilterBody = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  .rdrDateDisplayWrapper {
    display: none;
  }
`;
// dropdown sc ends
export const FilterFooter = styled.div`
  border-top: 1px solid #e8e8e8;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  padding: 0 1rem;
`;
export const DateRangeValue = styled.div`
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  color: #161a34;
  margin-right: 1rem;
`;
