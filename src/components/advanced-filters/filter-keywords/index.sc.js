import styled, { keyframes } from 'styled-components/macro';

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
  font-style: normal;
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
  right: 0;
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
  width: 50rem;
  height: fit-content;
  flex-shrink: 0;
  padding: 1.5rem;
`;
export const FilterHeader = styled.div`
  width: 100%;
  /* height: 1.2rem; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FilterTitle = styled.div`
  color: #000;
  font-size: 0.93rem;
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
  margin-bottom: 0.62rem;
`;
export const FilterBody = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0.8rem 0;
`;
export const FilterItemWrp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #eceff380;
  border-radius: 0.3rem;
`;
export const FilterFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
`;
export const FilterItemTitle = styled.div`
  color: #000;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const DropdownWrp = styled.div`
  width: fit-content;
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
  overflow-y: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export const FilterTextAreaWrp = styled.div`
  width: 100%;
  height: 10rem;
`;
export const FilterInputTextArea = styled.textarea`
  resize: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.secondaryText};
  border-radius: 0.375rem;
  border: 1px solid #e8e8e8;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  padding: 0.6rem 0.6rem;
  width: 100%; //calc(100% - 5rem)
  height: 100%;
  &::placeholder {
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1.4rem;
    color: #999999;
  }
  &:focus {
    outline: none;
    /* border: none; */
  }
`;
export const FilterInputWrap = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.secondaryText};
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.shadow};
  padding: 0.6rem 0.6rem;
  width: 100%; //calc(100% - 5rem)
  height: 100%;
`;
export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.438rem;
`;
export const ToggleLabel = styled.div`
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.063rem;
  color: #656b8a;
`;

export const RangeSelectorWrapper = styled.div`
  height: 3rem;
  display: flex;
  gap: 0.7rem;
  flex-direction: column;
`;
export const FilterSectionContainer = styled.div`
  width: 100%;
  display: flex;
  /* gap: 1rem; */
`;
export const FilterSection = styled.div`
  height: 100%;
  &.keywords {
    width: calc(65% - 0.63rem);
  }
  &.keywords-placement {
    width: calc(35% - 0.63rem);
  }
`;

export const SeparateBorder = styled.div`
  height: 17rem;
  width: 0.0625rem;
  background: ${({ theme }) => theme.borders};
  margin: 0 0.63rem;
`;
export const AddContentWrp = styled.div`
  width: calc(100% - 6.6rem);
  display: flex;
  align-items: flex-start;
  gap: 0.63rem;
`;
export const AddContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.69rem;
`;
export const AddText = styled.span`
  color: ${({ theme }) => theme.darkText};
  font-size: 0.8125rem;
  font-weight: 500;
  // line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
`;
export const AddItemContainer = styled.div`
  width: 100%;
  height: max-content;
  max-height: 7.5rem;
  overflow-y: auto;
  padding: 0.37rem 0.33rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.31rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  // background: rgb(236, 239, 243, 0.7);
  &::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.addItemContainerColor};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.addItemContainerColor};
  }
`;
export const KeywordWrap = styled.div``;
export const KeywordItem = styled.div`
  width: max-content;
  height: 2rem;
  padding: 0rem 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  border-radius: 0.3125rem;
  border: 1px solid ${({ theme }) => theme.borders};
  background: ${({ theme }) => theme.background};
  position: relative;
`;
export const InputWrp = styled.div`
  border-radius: 5px;
  background: ${({ theme }) => theme.background};
  /* border: 1px solid #d1d5dc; */
  /* padding: 0rem 0.75rem; */
  display: flex;
  align-items: center;
  width: 100%;
  height: 85%;
`;
export const KeywordValueInput = styled.input`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.85rem;
  width: 100%;
  height: 99%;
  color: ${({ theme }) => theme.keyValueColor};
  border: none;
  outline: none;
  &::placeholder {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 1rem;
    color: ${({ theme }) => theme.disabledBtnColor};
  }
`;
export const AddWordWrp = styled.div`
  width: max-content;
  height: 100%;
  display: flex;
  align-items: center;
  &.editing {
    width: 6rem;
  }
`;
export const KeywordValue = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1rem;
  letter-spacing: -0.01625rem;
  &.add {
    color: ${({ theme }) => theme.disabledBtnColor};
    font-weight: 500;
  }
`;
