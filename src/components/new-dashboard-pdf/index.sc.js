import styled from 'styled-components/macro';

export const MainPageWrap = styled.div`
  padding-top: 1.5rem;
  height: calc(100vh - 3rem - 4%);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 0.825rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const SearchSection = styled.div`
  margin: 0rem 1.5rem;
  border-radius: 0.625rem;
  background: ${({ theme }) => theme.background};
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
export const SaveSearchBtn = styled.div`
  /* margin-left: auto; */
  box-sizing: border-box;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 88.85px;
  height: 2.25rem;

  padding: 0.5rem 0.8125rem;
  border-radius: 0.3125rem;
  /* border: 1px solid ${({ theme }) => theme.primary}; */
  background: ${({ theme, disabled }) =>
    disabled ? '#C3C7D9' : theme.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
export const ButtonText = styled.span`
  /* text styling */
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  color: ${({ theme }) => theme.logoText};
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
    cursor: not-allowed;
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
  display: flex;
  padding: 0.125rem 0.375rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--corner-5-px, 0.3125rem);
  background: rgba(244, 81, 108, 0.2);
  width: auto;
  height: auto;
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

export const DropDownCont = styled.div`
  width: 5.5rem;
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
`;

export const DropDown = styled.div`
  width: auto;
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
  background: ${({ theme, disabled }) =>
    disabled ? '#C3C7D9' : theme.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
