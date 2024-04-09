import styled from 'styled-components/macro';

export const fullWidth = 100;
const margin = 1.5;
export const gap = 0.5;
export const dashboardWidth = 55 - margin;
export const articleWdth = fullWidth - dashboardWidth - margin;
export const buttonWidth = 1.37;
const SlotDetailsWrpGap = 0.5;
const SlotBodyHeight = 'calc(100% - 1.5rem) '; // -1*2 added for the gap value

export const TileArray = [
  {
    title: 'Total Articles',
    data: 342353534432432,
    change: 32.1,
    isIncreased: true,
  },
  { title: 'Total Reach', data: 34823874, change: 16.2, isIncreased: false },
  {
    title: 'Total Ad Value Equivalency',
    data: 34823874,
    change: 32.1,
    isIncreased: true,
  },
];

export const SearchResultWrp = styled.div`
  /* height: calc(100vh - 11.5rem); */
  width: 100%;
  height: calc(100% - 8.1rem);
  display: flex;
  padding: 0 1.5rem;
  position: relative;
  gap: ${({ activeScreen = '' }) =>
    activeScreen !== '' ? `${margin * 2}rem` : `${gap + 0.25}rem`};
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;
export const PopUpWrapper = styled.div`
  position: fixed;
  background-color: #161a34;
  bottom: 2.6rem;
  z-index: 30;
  display: ${({ activeScreen }) =>
    activeScreen === 'article' ? 'none' : 'flex'};
  right: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? 'calc(10vw + 0.25rem)'
      : activeScreen === 'article'
        ? '1000vw'
        : '55vw'};
`;
export const ArticleMainWrapper = styled.div`
  width: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? '0vw'
      : activeScreen === 'article'
        ? '100vw'
        : '45vw'};
  margin-left: ${({ activeScreen = '' }) =>
    activeScreen === 'article' && '1.5rem'};
  height: 100vh;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ activeScreen }) =>
    activeScreen === ''
      ? `
    ${ArticleSection} {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100vh;
      padding: 0.4rem;
      border-radius: 0.625rem;

    }
  `
      : activeScreen === 'article' &&
      `
    ${ArticleSection} {
      width: 100%;
    }
  `};
`;

export const DashboardSection = styled.div`
  width: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth - margin * 2}vw`
      : `${dashboardWidth}vw`};
  overflow: hidden;
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
  background-color: #eceff3;
  border-radius: 0.9375rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DashboardInnerSection = styled.div`
  height: 100%;
  padding-bottom: 5rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ArticleSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
export const Sectionwpr = styled.div`
  width: 100%;
  display: flex;
  height: 2.5rem;
  justify-content: space-between;
  padding: 0rem 1rem;
  align-items: center;
  position: relative;
`;

export const SectionTitle = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5625rem;
  letter-spacing: -0.4px;
  color: #161a34;
`;

// export const IconBoxwpr = styled.div`
//   align-items: center;
//   gap: 0.125rem;
//   display: flex;
//   background-color: #161a34;
//   border-radius: 0.3rem;
//   width: fit-content;
//   height: fit-content;
//   }
// `;
export const IconBoxwpr = styled.div`
  align-items: center;
  gap: 0.125rem;
  display: flex;
  background-color: #161a34;
  border-radius: 0.3rem;
  min-width: fit-content;
  width: fit-content;
  overflow: hidden;
  input {
    padding: ${({ isOpen }) => (isOpen ? '0.5rem' : '0')};
    background-color: #161a34;
    color: #fff;
    border: none;
    border-radius: 0.3rem;
    outline: none;
    font-size: 0.9rem;
    width: ${({ isOpen }) => (isOpen ? '12rem' : '0')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    transition: all 300ms ease-in-out, opacity 0.3s ease-in-out;
    position: absolute;
    bottom: 90%;
  }
`;
export const GraphIconBoxwpr = styled.div`
  position: ${({ fixed }) => fixed && 'fixed'};
  align-items: center;
  gap: 0.125rem;
  bottom: 2.5rem;
  display: flex;
  background-color: #161a34;
  border-radius: 0.3rem;
  width: fit-content;
  overflow: hidden;
`;
export const Iconwpr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ width = '2.25rem', height = '2.25rem' }) => `
  height: ${height};
  width: ${width};
  `}
  cursor: pointer;
  border-radius: 0.25rem;
  /* margin-top: 0.3rem; */
  position: relative;
`;

export const BtnWrp = styled.div`
  position: absolute;
  display: ${({ activeScreen }) => (activeScreen === '' ? 'flex' : 'none')};
  top: ${({ top = '8.5rem' }) => top};
  box-shadow: 0px 5px 10px rgba(108, 73, 172, 0.1);
  left: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth - buttonWidth}vw`
      : activeScreen === 'article'
        ? `${-1.1 * buttonWidth}vw`
        : `${dashboardWidth + gap - 1.3}vw`};
  background-color: #fff;
  height: 1.875rem;
  width: 2.75rem;
  border: 1px solid #161a34;
  border-radius: 0.625rem;
  z-index: 2;
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const Btn = styled.button`
  border: none;
  width: ${`${buttonWidth}rem`};
  height: 100%;
  padding: 0.12rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &.inactive {
    background-color: #675ef2;
    color: #fff;
  }

  &:hover > svg > path {
    stroke: #fff;
  }
  transform: ${({ rotate }) => rotate === true && 'rotate(180deg)'};
`;

export const SearchPageWrp = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

export const SearchMainWrp = styled.div`
  height: calc(100vh - 3rem - 4%);
  overflow: hidden;
  &.p-relative {
    position: relative;
  }

  /* &::-webkit-scrollbar {
    display: none;
  } */
`;
export const SearchSection = styled.div`
  margin: 1rem 1.5rem 0.75rem 1.5rem;
`;

export const UserTilesMainWrp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0rem 0rem 0.3125rem 0.3125rem;
  background: #fff;
  padding: 1rem 1.25rem;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
`;

export const UberTextTitle = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  font-family: Inter;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

export const UberTilesWrp = styled.div`
  width: 100%;
  display: flex;
  gap: 4.75rem;
`;

export const SlotWrp = styled.div`
  position: relative;
  margin: 0rem 0rem 2rem 0rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  .y.axis > .domain {
    display: none;
  }

  .y.axis > .tick > .y-axis-line {
    display: block;
  }

  .y.axis > .tick > text,
  .x.axis > .tick > text {
    fill: #585858;
    font-size: 0.6rem;
    font-family: ${({ theme }) => theme.fontFamily};
     text-transform: capitalize;
  }
  .x.axis > .domain {
    stroke: #999999;
  }
`;
export const FullSlot = styled.div`
  width: 100%;
  height: 25rem;
  border-radius: ${({ theme }) => theme.primaryBorderRadius};
  padding: 1rem 1.25rem;
  background-color: #ffffff;
  cursor: pointer;
  border: 2px solid ${({ selected }) => (selected ? 'blue' : 'none')};
  z-index: ${({ selected }) => (selected ? 1 : null)};
`;
export const HalfSlot = styled.div`
  height: 24rem;
  background-color: #ffffff;
  border-radius: ${({ theme }) => theme.primaryBorderRadius};
  padding: 1rem 1.25rem;
  width: calc(50% - 0.375rem);
  cursor: pointer;
  border: 2px solid ${({ selected }) => (selected ? 'blue' : 'none')};
  z-index: ${({ selected }) => (selected ? 1 : null)};
`;

export const Line = styled.div`
  background: rgba(160, 167, 198, 0.6);
  height: 2px;
  margin-bottom: 0.25rem;
  width: calc(100% + 2rem);
  position: absolute;
  bottom: 0;
  left: -1rem;
`;

export const SlotDetailsMainWrp = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding-bottom: ${({ type }) => (type === 'dashboard' ? '0.5rem' : '')};
  box-sizing: border-box;
`;
export const SlotDetailsWrp = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SlotDetailsWrpGap}rem;
`;
export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000044;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
`;

export const SlotHeader = styled.div`
  height: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const SlotHeaderLeft = styled.div`
  width: 100%;
`;
export const SlotHeaderRight = styled.div``;
export const GraphTypeBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const GraphTypeBtn = styled.div`
  width: 4.4rem;
  height: 1.3rem;
  padding: 0.4rem 0.66rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #eceff3;
  color: #000;
  font-size: 0.66rem;
  font-weight: 500;
  line-height: 0.66rem;
  letter-spacing: 0.214px;
  transition: all 600ms ease;
  &.active {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.logoText};
    transition: all 600ms ease;
  }
`;

export const SlotTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #161a34;
  width: 95%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const SlotSubTitle = styled.div`
  font-size: 0.8rem;
  color: #585858;
`;
export const SlotBody = styled.div`
  position: relative;
  height: ${({ type }) =>
    type === 'dashboard' ? `calc(${SlotBodyHeight} - 3rem)` : SlotBodyHeight};
  width: 100%;
  &.legend,
  &.commentary {
    height: calc(${SlotBodyHeight} - 4rem);
  }

  .selected {
    transition: all 400ms ease;
    opacity: 1 !important;
  }

  .unselected {
    transition: all 400ms ease;
    opacity: 0.2 !important;
  }

  .hover-selected {
    transition: all 400ms ease;
    opacity: 1 !important;
  }
  .hover-unselected {
    transition: all 400ms ease;
    opacity: 0.2 !important;
  }
  .word-cloud-text {
    font-weight: 700;
  }

  .bubble-label {
    fill: #fff;
  }

  .bubble-value {
    fill: #fff;
    font-weight: 700;
  }

  .column-rect-3d-label {
    fill: #fff;
    font-size: 0.75rem;
    text-transform: capitalize;
  }

  .pie-path-label {
    font-size: 0.6rem !important;
  }
  .pie-path-value {
    font-size: 0.8rem !important;
    font-weight: 700;
  }

  &[type='l1'] .y.axis > .domain {
    display: none;
  }

  &[type='l1'] .y.axis > .tick > line:first-child,
  &[type='l1'] .y.axis > .tick > text {
    display: none;
  }
`;

export const SlotBodyTabWrp = styled.div`
  height: 3rem;
  width: 100%;
`;

export const SlotBodyTabBody = styled.div`
  height: calc(100% - ${({ enableTabs }) => (enableTabs ? '3rem' : '0rem')});
  padding: ${({ enableTabs }) => (enableTabs ? '0rem' : '1rem 0rem')};
`;

export const SlotPlaceHolderImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const DropHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  /* height: 3rem; */
  //margin-bottom: 1rem;
`;
export const TopInfowpr = styled.div`
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const BottomDeswpr = styled.div`
  width: 100%;
  height: 1rem;
`;

export const TooltipBodyValue = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 0.75rem;
  color: #000000;
`;

export const Paginatewpr = styled.div`
  width: ${({ pageWidth }) => pageWidth};
  position: absolute;
  display: flex;
  bottom: ${({ articlePosition }) =>
    articlePosition !== '' ? '0rem' : '4rem'};
  right: ${({ pageWidth, articlePosition }) =>
    pageWidth === '40.5vw'
      ? '3.1rem'
      : pageWidth === '45vw' && articlePosition === 'left'
        ? '3.75rem'
        : pageWidth === '45vw'
          ? '1.75rem'
          : articlePosition === 'left'
            ? '3.2rem'
            : '1.4rem'};
  align-items: center;
  justify-content: space-between;
  z-index: 30;
  /* overflow: hidden; */
`;
// search
export const SearchWrp = styled.div`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.625rem;
  display: flex;
  /* grid-template-rows: 0fr; */
  transition: all 300ms ease;
  z-index: 5;
  width: 100%;
  padding: 1rem 1.25rem;
  &.active {
    width: 100%;
    height: 23.5rem;
    /* grid-template-rows: 1fr; */
  }
  .filter-wrapper {
    padding: 0rem 0 0 1.25rem;
  }
`;
export const NonEditModeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.63rem;
  /* justify-content: center; */
  /* opacity: ${({ isEditMode }) => (isEditMode ? 0 : 1)};
  height: ${({ isEditMode }) => (isEditMode ? 0 : '100%')};
  transition: all 300ms ease-in-out; */
`;
// export const EditModeContainer = styled.div`
//   width: 100%;
//   transition: all 300ms ease;
// `;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 0.6rem;
  /* padding: 0 1.25rem; */
`;
export const ActionNavigationCon = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-left: auto;
`;
// export const SaveSearchBtn = styled.div`
//   box-sizing: border-box;
//   display: flex;
//   gap: 0.5rem;
//   align-items: center;
//   justify-content: center;
//   width: 5.31rem;
//   height: 2.125rem;
//   padding: 0.5rem 0.8125rem;
//   border-radius: 0.3125rem;
//   border: 1px solid ${({ theme }) => theme.primary};
//   background: ${({ theme }) => theme.background};
//   cursor: pointer;
//   /* text styling */
//   font-size: 0.9375rem;
//   font-weight: 500;
//   line-height: 1.125rem;
//   letter-spacing: -0.01875rem;
//   color: ${({ theme }) => theme.primary};
// `;
export const SearchContainer = styled.div`
  width: 15rem;
  height: 2.125rem;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 0.3rem 0.6rem;
  border-radius: 0.3125rem;
  border: 1px solid ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  cursor: pointer;
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
export const SearchValueCon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const SearchedValue = styled.div`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.688rem;
  color: ${({ theme }) => theme.text};
`;
export const IconWraper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: ${({ articlePosition }) =>
    articlePosition === 'left' ? 'calc(30% + 0.5rem)' : 'calc(60% - 0.5rem)'};
  top: 3%;
  z-index: 30;
  background-color: white;
  border-radius: 100%;
  /* border: 10px solid red; */
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
`;
export const SectionBorder = styled.div`
  opacity: 0.5;
  border: 1px solid #555555;
  height: 0px;
  width: 100%;
`;
// guided search and search bar styled-cs
export const GuidedSearchSection = styled.div`
  width: 100%;
  height: 6.25rem;
  display: flex;
  align-items: center;
`;
export const TextAreaCon = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.secondaryBackground};
  position: relative;
  &.border-right {
    border-right: 1.00636px solid #ffffff;
  }
  &.br-left {
    border-radius: 0.75rem 0 0 0.75rem;
  }
  &.br-right {
    border-radius: 0 0.75rem 0.75rem 0;
  }
`;
export const GuidedTextArea = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
  color: ${({ theme }) => theme.secondaryText};
  box-shadow: 1px 0px 0px #d9d9d9;
  padding: 0.6rem 0.813rem;
  padding-top: 2rem;
  border: 1.00636px solid #ffffff;
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
    border-radius: 0.75rem 0 0 0.75rem;
  }
  &.br-tr-br {
    border-radius: 0 0.75rem 0.75rem 0;
  }
`;
export const TextAreaLabel = styled.label`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.938rem;
  color: #000000;
  position: absolute;
  top: 0.688rem;
  left: 0.813rem;
`;
export const SearchBarWrapper = styled.div`
  width: 100%;
  /* -webkit-transition: max-height 300ms;
  -moz-transition: max-height 300ms;
  -ms-transition: max-height 300ms;
  -o-transition: max-height 300ms; */
  transition: max-height 300ms;
  overflow: hidden;
  max-height: 0;
  &.active {
    height: 6.25rem;
    max-height: 6.25rem;
  }
`;
export const ExpandedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;
export const SearchesContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;
export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.438rem;
`;
export const ToggleLabel = styled.div`
  font-weight: 400;
  font-size: 0.85rem;
  line-height: 1.063rem;
  color: ${({ theme }) => theme.text};
`;
export const WrapperContainer = styled.div`
  width: 100%;
  transition: max-height 300ms;
  max-height: 0;
  overflow: hidden;
  &.active {
    height: 15.35rem;
    max-height: 15.35rem;
  }
`;
export const TabPopwpr = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.showTab ? 'flex' : 'none')};
  & > div {
    width: 100%;
  }
  z-index: 2;
  border-bottom: 1px solid rgb(204, 204, 204);
  background-color: ${({ theme }) => theme.background};
`;
export const FilterWrp = styled.div`
  width: calc(100% - 22.06rem);
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const BottomInfowpr = styled.div`
  display: flex;
  height: 2rem;
  display: flex;
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  align-items: center;
`;

export const IconBox = styled.div`
  cursor: auto;
  position: absolute;
  /* width: 5.75rem; */
  display: flex;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  top: 0;
  /* top: ${({ type }) => (type === 'dashboard' ? '-0.45rem' : '0')}; */
  right: 0;
  gap: 0.5rem;
`;
// new
export const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const CrossButtonWrp = styled.div`
  transform: rotate(180deg);
  cursor: pointer;
  margin-right: 0.5rem;
`;
export const SearchTextWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  /* flex-direction: column; */
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
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5625rem;
  letter-spacing: -0.025rem;
  text-transform: uppercase;
`;
export const SaveSearchBtn = styled.div`
  margin-left: auto;
  box-sizing: border-box;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 2.25rem;
  padding: 0.5rem 0.8125rem;
  border-radius: 0.3125rem;
  /* border: 1px solid ${({ theme }) => theme.primary}; */
  background: ${({ theme }) => theme.primary};
  cursor: pointer;
`;
export const ButtonText = styled.span`
  /* text styling */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
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
export const SearchQueryBox = styled.div`
  width: 100%;
  height: 2.5rem;
  padding: 0.625rem 1.0625rem;
  border-radius: 0.3125rem;
  border: ${({ theme }) => `1px solid ${theme.shadow}`};
  background: ${({ theme }) => theme.background};
  cursor: pointer;
  transition: all 300ms ease;
  /* text styling */
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &.hide {
    display: none;
  }
`;
export const Iconwrp = styled.div`
  ${({ width = '1.5rem', height = '1.5rem' }) => `
  height: ${height};
  width: ${width};
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const SlotFooter = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;
export const LegendSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export const CommentarySection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: start;
`;
export const CommentaryLabel = styled.div`
  text-align: center;
  color: #656b8a;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const DropdownWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0.65rem;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  height: auto;
  width: 9.5rem;
  margin-bottom: 2.5rem;
  padding: 0.75rem 1.25rem;
  background: rgb(103, 94, 242);
  border-radius: 0.5rem;
  gap: 0rem;
  flex-direction: column;
  z-index: 30;
`;

export const SortOption = styled.div`
  color: #fff;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  list-style-type: none;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.01625rem;
  flex-shrink: 0;
  margin: 0.45rem 0rem;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
// SlotOverview
export const SlotOverviewWrapper = styled.div`
  width: fit-content;
  height: 3rem;
`;
export const SlotOverviewWrp = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* padding: 0.25rem 42rem 0.25rem 1.25rem; */
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
  white-space: nowrap;
  &.flex-row {
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
  }
`;
export const SlotOverviewHeader = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02875rem;
`;
export const SlotOverviewSubHeader = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 0.6875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem;
  text-transform: uppercase;
`;
export const VerticalCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
export const LineShow = styled.div`
  position: absolute;
  top: 0;
  border-left: 1px solid gray;
  height: 100%;
  left: ${(props) => props.xAxis}px;
`;
