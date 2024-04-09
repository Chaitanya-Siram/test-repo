import styled from 'styled-components/macro';

export const PageWrp = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;
export const PageMainWrp = styled.div`
  height: calc(100vh - 3rem - 4%);
  overflow-y: auto;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.825rem;
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
`;
export const SearchSection = styled.div`
  margin: 0rem 1.5rem;
  border-radius: 0.625rem;
  background: ${({ theme }) => theme.background};
  position: relative;
  z-index: 1;
  top: 0;
`;
export const SearchWrp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.938rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 5;
  padding: 1.25rem;
  /* .filter-wrapper {
    padding: 0rem 0 0 1.25rem;
  } */
`;
export const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  .ml {
    margin-left: 0.5rem;
  }
`;
export const CrossButtonWrp = styled.div`
  transform: rotate(180deg);
  cursor: pointer;
  margin-right: 0.5rem;
`;
export const SearchTextWrp = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const DashboardType = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.5625rem;
  font-weight: 500;
  line-height: 0.75rem;
  letter-spacing: -0.01125rem;
  text-transform: capitalize;
`;
export const SearchText = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1.4375rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02875rem;
`;
export const SaveSearchBtn = styled.button`
  height: 2.25rem;
  padding: 0.5rem 0.6rem;
  border-radius: 0.3125rem 0 0 0.3125rem;
  border: none;
  background: ${({ theme, disabled }) =>
    disabled ? '#C3C7D9' : theme.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    transition: background 0.2s ease;
    background: ${({ disabled }) => (disabled ? '#C3C7D9' : '#857ef5')};
  }

  &:active {
    background: #524bc2;
  }
`;
export const ButtonText = styled.span`
  /* text styling */
  font-size: ${({ dropDown }) => (dropDown ? '0.8125rem' : '0.9375rem')};
  font-weight: ${({ dropDown }) => (dropDown ? 400 : 500)};
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  color: ${({ theme, dropDown }) => (dropDown ? theme.secondaryText : '#fff')};
  &:hover {
    color: ${({ theme, dropDown }) => (dropDown ? theme.primary : '#fff')};
  }
`;
export const SectionBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const QueryFilterCon = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const SearchContainer = styled.div`
  width: 15rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  border-radius: 0.3125rem;
  border: 1px solid #e8e8e8;
  background: #f3f4f7;
  cursor: pointer;
  &.disabled {
    background-color: #f3f4f7;
    cursor: pointer;
  }
`;
export const SmallTitle = styled.div`
  width: calc(100% - 1.5rem);
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem;
  letter-spacing: -0.02125rem;
  color: #161a34;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &.center {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const DashboardTypeDiv = styled.div`
  margin-left: 0.5rem;
  /* margin-top: 0.5rem; */
`;

export const DashboardTypeDivText = styled.h3`
  color: #f4516c;
  font-family: Inter;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; /* 160% */
  letter-spacing: 0.0625rem;
  margin: 0;
  text-transform: uppercase;
`;

export const DropDownMasterWrpr = styled.div`
  margin-right: 0.63rem;
  margin-left: auto;
  .dropdownCont {
    height: 27.5rem;
    overflow-y: auto;
    box-shadow: 0px 10px 20px 0px #00000033;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ButtonBoxwpr = styled.div`
  display: flex;
  padding: 0.625rem 0.93rem;
  background: ${({ background, disabled }) =>
    disabled ? '#C3C7D9' : background};
  border-radius: 6px;
  height: 2.4rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.75rem;
  color: ${({ fontColor }) => fontColor};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
export const FiltersWrp = styled.div`
  width: calc(100% - 15rem);
`;

export const DropdownForButton = styled.div`
  width: auto;
  height: auto;
`;
export const Btnwrp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* padding: 0rem 0.5rem; */
  border-radius: 0.3125rem;
  border: none;
  background: ${({ theme, disabled }) =>
    disabled ? '#C3C7D9' : theme.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    transition: background 0.2s ease;
    background: #857ef5;
  }

  &:active {
    background: #524bc2;
  }
`;
export const DropDownWrp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 2.25rem;
  border-radius: 0 0.3125rem 0.3125rem 0;
  padding: 0 0.5rem 0 0.25rem;
  background: ${({ theme, disabled }) =>
    disabled ? '#C3C7D9' : theme.primary};
  &:hover ~ .save-btn {
    transition: background 0.2s ease;
    background: #857ef5;
  }
  &:hover {
    transition: background 0.2s ease;
    background: ${({ disabled }) => !disabled && '#857ef5'};
  }
`;

export const DropDownCont = styled.div`
  width: 5rem;
  height: auto;
  position: absolute;
  z-index: 10;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #675ef2;
  border-radius: 0.3125rem;
  animation: 600ms ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px 0px;
  border-radius: 0.375rem;
  & :hover {
    > span {
      color: ${({ theme }) => theme.primary};
    }
    /* transition: background 0.5s ease;
    background: #857ef5; */
  }
`;

export const DropDown = styled.div`
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  color: ${({ theme }) => theme.logoText};
  width: 100%;
  height: 2.25rem;
  padding: 0.5rem;
  flex-direction: row;
  gap: 0.1rem;
  position: static;
  z-index: 10;
  display: flex;
  align-items: center;
  border-radius: 0.3125rem;
  justify-content: center;
  color: #fff;
  background: ${({ theme, disabled }) => (disabled ? '#C3C7D9' : '#fff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    transition: background 0.2s ease;
    color: ${({ theme }) => theme.primary};
  }
`;
