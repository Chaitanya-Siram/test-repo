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
  width: 55rem;
  height: fit-content;
  flex-shrink: 0;
  padding: 1.5rem;
`;
export const FilterHeader = styled.div`
  width: 100%;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FilterTitle = styled.div`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
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
  height: 20rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
`;
export const FilterItemWrp = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.94rem;
  border-radius: 0.313rem;
  /* border: 1px solid rgba(195, 199, 217, 0.5); */
  background: rgba(236, 239, 243, 0.5);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &.custom {
    width: calc(33.33% - 1.2rem); // 1.2rem is the gap value
  }
`;
export const FilterFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FilterItemTitle = styled.div`
  color: #000;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  max-height: calc(8 * 1.55rem);
  overflow-y: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export const TitleBoxwpr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
  padding-bottom: 0.625rem;
`;
export const CustomSourcesWrp = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
`;
export const SourceInputSearchWrp = styled.div`
  width: 100%;
  height: 1.875rem;
`;
export const SourceInputSearch = styled.input`
  border: 1px solid #d9d9d9;
  outline: none;
  background: ${({ theme }) => theme.background};
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 0.62rem;
  &::placeholder {
    color: #999999;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    letter-spacing: -0.015rem;
  }
`;
export const SearchListContainer = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  overflow-y: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export const SearchListItem = styled.div`
  width: 100%;
  height: ${({ customSearchItemHeight }) => `${customSearchItemHeight}rem`};
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &.selected-wrp {
    background-color: ${({ theme }) => theme.primary};
  }
`;
export const SearchLabel = styled.div`
  padding-left: 0.625rem;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.015rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.secondaryText};
  :hover {
    color: ${({ theme }) => theme.primary};
  }
  &.selected {
    color: ${({ theme }) => theme.background};
  }
  width: calc(100% - 2.5rem);
`;
export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.31rem;
`;
export const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.31rem;
`;
export const ActionIconWrp = styled.div`
  width: 2.5rem;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 0.62rem;
`;
export const ActionIconItem = styled.div`
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  &.icon-active {
    path {
      fill: ${({ theme }) => theme.primary};
    }
  }
`;

export const PopupIconWrp = styled.div`
  cursor: pointer;
  svg {
    width: 100%;
  }
`;
export const ComponentBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(160, 167, 198, 0.6); */
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  transition: opacity 400ms ease;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`;
