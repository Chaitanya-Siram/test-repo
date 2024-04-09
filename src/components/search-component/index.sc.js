import styled from 'styled-components';

export const SearchComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* gap: 1.836rem; */
`;
export const HeaderLeftCon = styled.div`
  display: flex;
  align-items: center;
`;
export const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.375rem;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.darkText};
  margin: 0 1rem 0 0;
`;
export const SearchBarWrapper = styled.div`
  width: 100%;
  height: ${({ isFocused }) => (isFocused ? '18rem' : '2.8rem')};
  transition: height 400ms ease-in-out;
  flex-shrink: 0;
`;
export const SearchesContainer = styled.div`
  width: 13.12rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.62rem;
  margin-left: auto;
  /* margin-top: 1rem; */
`;
export const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const IconText = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 1.188rem;
  color: ${({ theme }) => theme.primary};
`;
export const ExpandedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.375rem;
`;

export const SavedSearchContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  cursor: pointer;
`;
export const FilterWrapper = styled.div`
  width: 100%;
`;
export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  /* .dropdown-btn {
    padding-left: 0;
    padding-right: 0;
  } */
`;
export const SaveCount = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;
export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.438rem;
  margin-right: auto;
`;
export const ToggleLabel = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  line-height: 1.063rem;
  color: ${({ theme }) => theme.darkText};
`;
export const GuidedSearchSection = styled.div`
  width: 100%;
  height: 18rem;
  display: flex;
  align-items: center;
`;
export const TextAreaCon = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  position: relative;
  &.border-right {
    border-right: 1.006px solid #c3c7d9;
  }
  &.br-left {
    border-radius: 0.3125rem 0 0 0.3125rem;
  }
  &.br-right {
    border-radius: 0 0.3125rem 0.3125rem 0;
  }
`;
export const GuidedTextArea = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 18rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.secondaryText};
  box-shadow: 1px 0px 0px #d9d9d9;
  padding: 1rem;
  padding-top: 2rem;
  border: 1.006px solid #c3c7d9;
  border-right: none;
  outline: none;
  &::placeholder {
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 0.938rem;
    color: #999999;
    /* opacity: 0.7; */
  }
  &.br-tl-bl {
    border-radius: 0.3125rem 0 0 0.3125rem;
  }
  &.br-tr-br {
    border-radius: 0 0.3125rem 0.3125rem 0;
  }
`;
export const GuidedTextWrp = styled.div`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 18rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.secondaryText};
  box-shadow: 1px 0px 0px ${({ theme }) => theme.addItemContainerColor};
  padding: 1rem;
  padding-top: 2rem;
  border: 1.006px solid ${({ theme }) => theme.borders};
  border-right: none;
  outline: none;
  &::placeholder {
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 0.938rem;
    color: ${({ theme }) => theme.disabledBtnColor};
    /* opacity: 0.7; */
  }
  &.br-tl-bl {
    border-radius: 0.3125rem 0 0 0.3125rem;
  }
  &.br-tr-br {
    border-radius: 0 0.3125rem 0.3125rem 0;
  }
`;

export const TextAreaLabel = styled.label`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.938rem;
  color: #000000;
  position: absolute;
  top: 0.688rem;
  left: 1.05rem;
`;
export const WrapperContainer = styled.div`
  width: 100%;
  transition: all 400ms ease-in-out;
  height: 0;
  opacity: 0;
  margin-top: -1rem;
  z-index: -1;
  &.active {
    height: 2.5rem;
    opacity: 1;
    margin-top: 0;
    z-index: 1;
  }
`;
export const RecentSearchWrp = styled.div`
  width: 100%;
  height: 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  &.expanded {
    width: calc(100% - 13.12rem);
  }
`;

export const ErrorWrp = styled.div`
  width: 25rem;
  height: 15rem;
  /* top: 395px */
  /* left: 3175px */
  padding: 2rem;
  border-radius: 1rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
`;

export const ErrorCtnWrp = styled.div`
  width: 23rem;
  height: 9rem;
  gap: 1.5rem;
`;

export const ErrorTitle = styled.div`
  font-family: Inter;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: -0.02em;
  text-align: left;
`;

export const ErrorDsp = styled.div`
  width: 23rem;
  height: 4rem;
  gap: 12px;
  font-family: Inter;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.3rem;
  letter-spacing: -0.01em;
  text-align: left;
`;

export const ErrorSpan = styled.span`
  color: #bf2b2b;
`;

export const ErrorBtn = styled.button`
  width: 5rem;
  height: 2.8rem;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  gap: 1rem;
  background-color: #5f39f8;
  color: #ffff;
  cursor: pointer;
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
