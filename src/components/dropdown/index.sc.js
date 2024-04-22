import styled, { keyframes } from 'styled-components';

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
  height: ${(props) => (props.newHeight ? `${props.newHeight}rem` : ' 2.5rem')};
  box-sizing: border-box;
  border-radius: 0.3125rem;
  border: 1px solid #dedede;
  @media (max-width: 1250px) {
    width: 12%;
    height: 2.1rem;
  }
  /* padding: 0.4375rem 0.5rem; */
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
  /* justify-content: space-between; */
  gap: 0.375rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 1250px) {
    padding: 0.2rem;
    gap: 0.1rem;
  }
`;

export const DropdownList = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 2.5rem;
  z-index: 1;
  background: #ffffff;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  /* border: 1px solid #000000; */
  border-radius: 0.375rem;
  list-style-type: none;
  padding: 0;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin: 0;
  width: 100%;
  min-width: max-content;
  /* max-height: ${({ dropdownListHeight }) => `${dropdownListHeight}rem`}; */
  display: ${({ open }) => (open ? 'block' : 'none')};
  animation: ${({ open }) => (open ? fadeIn : fadeOut)} 600ms ease-in-out;
  &.open-from-left {
    left: 0;
  }
  &.open-from-right {
    right: 0;
  }
`;

export const DropdownListItem = styled.li`
  height: 2rem;
  padding: 0.5rem 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.813rem;
  &.dropdown-search {
    height: 1.875rem;
    padding: 0rem 0.625rem;
  }
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  color: ${({ theme }) => theme.secondaryText};
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: 1250px) {
    /* line-height: 1rem; */
    font-size: 0.7rem;
  }
`;
export const Checkbox = styled.input`
  margin-right: 0.5rem;
`;
export const OptionTitle = styled.span`
  font-size: 0.813rem;
  line-height: 1rem;
`;
export const Selection = styled.div`
  height: 1.1875rem;
  padding: 0.25rem 0.3125rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 4px 9px; */
  background: ${({ theme }) => theme.primary};
  font-size: 0.6875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 0.6875rem;
  color: ${({ theme }) => theme.logoText};
  @media (max-width: 1250px) {
    height: 1rem;
  }
`;
export const CountIconWrapper = styled.div`
  /* width: 2.875rem; */
  display: flex;
  align-items: center;
  gap: 0.6875rem;
  margin-left: auto;
  @media (max-width: 1250px) {
    gap: 0.2rem;
  }
`;
export const DropdownInputSearch = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.secondaryBackground};
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
  &:focus {
    background: ${({ theme }) => theme.secondaryBackground};
  }
  &::placeholder {
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.4rem;
    color: #555555;
    display: flex;
    align-items: flex-end;
  }
`;
export const IconContainer = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  @media (max-width: 1250px) {
    width: 1rem;
    height: 1rem;
  }
`;
export const DropdownFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.25rem 0.625rem 0 0.625rem;
`;
export const ScrollableWrapper = styled.div`
  width: 100%;
  height: calc(100% - 6.625rem);
  max-height: ${({ dropdownListHeight }) => `${dropdownListHeight}rem`};
  overflow-y: auto;
`;
