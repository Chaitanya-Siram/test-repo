import styled, { css, keyframes } from 'styled-components/macro';
import ArticleSectionComponent from './article-section';

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
  width: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth + articleWdth + margin * 2}vw`
      : activeScreen === 'article'
      ? `${fullWidth + dashboardWidth + margin * 2}vw`
      : '100vw'};
  height: calc(100% - 10.5rem);
  transform: ${({ activeScreen = '' }) =>
    activeScreen === 'article'
      ? `translateX(${-1 * (dashboardWidth + margin * 2)}vw)`
      : 'none'};
  display: flex;
  padding: 0 1.5rem;
  position: relative;
  gap: ${({ activeScreen = '' }) =>
    activeScreen !== '' ? `${margin * 2}rem` : `${gap + 0.25}rem`};
  /* transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1); */
`;
export const PopUpWrapper = styled.div`
  position: fixed;
  background-color: #161a34;
  z-index: 30;
  display: ${({ activeScreen }) =>
    activeScreen === 'article' ? 'none' : 'flex'};
  right: ${({ activeScreen = '', articlePosition }) =>
    activeScreen === 'dashboard'
      ? articlePosition === 'left'
        ? '10vw'
        : '60vw'
      : activeScreen === 'article'
      ? '1000vw'
      : '55vw'};
`;
export const ArticleMainWrapper = styled.div`
  width: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? '0vw'
      : activeScreen === 'article'
      ? `${fullWidth - margin * 2}vw`
      : `${fullWidth - dashboardWidth - margin * 2}vw`};
  height: 100%;
  /* overflow: auto; */
  &::-webkit-scrollbar {
    display: none;
  }
  /* ${(activeScreen) =>
    activeScreen === 'article' &&
    `
    ${ArticleSectionComponent}{
      transition: all 400ms linear 0s;
    }`}; */

  border-radius: 0.625rem;
  ${({ activeScreen }) =>
    activeScreen === ''
      ? `
    ${ArticleSection} {
      width: ${fullWidth - dashboardWidth - margin * 2}vw;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      padding: 1rem 0.4rem;
      border-radius: 0.625rem;
    }
  `
      : activeScreen === 'article' &&
        `
        ${ArticleSection} {
      width: ${fullWidth - margin * 2}vw;
      border-radius: 0.625rem;
      height:100%;
      padding:0.4rem;
    }
  `};
`;
export const LoaderWrp = styled.div`
  height: 100%;
  /* width: 100%; */
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DashboardSection = styled.div`
  width: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth - margin * 2}vw`
      : `${dashboardWidth}vw`};
  overflow: ${({ activeScreen = '' }) => (activeScreen !== '' ? 'hidden' : '')};
  /* transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1); */
  background-color: #eceff3;
  border-radius: 0.9375rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DashboardInnerSection = styled.div`
  height: 100%;
  padding-bottom: 5rem;
  overflow: ${({ articlePosition = '' }) =>
    articlePosition !== '' ? 'hidden' : 'auto'};
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ArticleSection = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 2rem);
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
`;

export const SectionMainWrp = styled.div`
  width: 100%;
  display: flex;
`;
export const Sectionwpr = styled.div`
  width: 100%;
  display: flex;
  height: 2.5rem;
  justify-content: ${({ started }) => (started ? 'flex-start' : 'flex-end')};
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
  white-space: nowrap;
  overflow: hidden;
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
export const CheckInp = styled.input`
  width: 1.25rem;
  height: 1.25rem;
`;

export const IconBoxwpr = styled.div`
  align-items: center;
  gap: 0.125rem;
  display: flex;
  background-color: ${({ bgColor }) => bgColor || '#161a34'};
  border-radius: 0.3rem;
  min-width: fit-content;
  width: fit-content;
  overflow: hidden;
`;
export const SearchInputSeaction = styled.div`
  position: absolute;
  background-color: #161a34;
  width: fit-content;
  display: flex;
  align-items: center;
  max-height: 2rem;
  justify-content: space-between;
  border-radius: 0.3rem;
  top: -2.5rem;
  right: 0;
  padding: 0.25rem 0 0.25rem 0.25rem;
  &:hover {
    cursor: pointer;
  }

  input {
    padding: ${({ isOpen }) => (isOpen ? '0.5rem' : '0')};
    background-color: #161a34;
    color: #fff;
    border: none;
    border-radius: 0.3rem;
    outline: none;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem; /* 133.333% */
    letter-spacing: -0.015rem;
    width: ${({ isOpen }) => (isOpen ? '12rem' : '0')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    height: 2.5rem;
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
  position: relative;
  align-items: center;
  justify-content: center;
  /* z-index: 1; */
  ${({ width = '2.25rem', height = '2.25rem' }) => `
  height: ${height};
  width: ${width};
  `}
  cursor: pointer;
  border-radius: 0.25rem;
  /* margin-top: 0.3rem; */
`;
export const SearchMainWrraper = styled.div`
  /* position: relative; */
`;
export const InputSearchBar = styled.input`
  /* padding: 2px; */
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  max-width: 8rem;
  max-height: 1.5rem;
`;
export const Dot = styled.div`
  position: absolute;
  top: 0.35rem;
  right: 0.25rem;
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background-color: red;
`;
export const InputIconWrapper = styled.div`
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
`;

export const BtnWrp = styled.div`
  position: absolute;
  overflow: hidden;
  top: ${({ top = '8.5rem' }) => top};
  box-shadow: 0px 5px 10px rgba(108, 73, 172, 0.1);
  left: ${({ activeScreen = '' }) =>
    activeScreen === 'dashboard'
      ? `${fullWidth - buttonWidth}vw`
      : activeScreen === 'article'
      ? `${-1.1 * buttonWidth}vw`
      : `${dashboardWidth + gap - 1}vw`};
  background-color: #fff;
  height: 1.875rem;
  width: 2.75rem;
  border: 1px solid #161a34;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
    cursor: pointer;
  }
  &:hover > svg > path {
    stroke: #fff;
  }
  transform: ${({ rotat }) => rotat === true && 'rotate(180deg)'};
`;

export const SearchPageWrp = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

export const SearchMainWrp = styled.div`
  height: calc(100vh - 3rem - 4%);
  /* overflow: hidden; */
  &.p-relative {
    position: relative;
  }

  /* &::-webkit-scrollbar {
    display: none;
  } */
`;
export const SearchSection = styled.div`
  height: 10.5rem;
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
  width: ${({ activeScreen }) =>
    activeScreen === 'dashboard' ? '75%' : '100%'};
  display: flex;
  gap: 3rem;
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
  line-height: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SlotTypeTitle = styled.span`
  padding: 4px 8px 4px 8px;
  border-radius: 5px;
  margin-left: 10px;
  background: ${({ type, theme }) =>
    type === 'brand' || type === 'competition'
      ? theme.customBrandBckgrnd
      : type === 'industry'
      ? theme.customIndustryBckgrnd
      : type === 'people'
      ? theme.customPeopleBckgrnd
      : ''};
  font-family: Inter;
  font-size: 11px;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ type, theme }) =>
    type === 'brand' || type === 'competition'
      ? theme.customBrandLabelColor
      : type === 'industry'
      ? theme.customIndustryLabelColor
      : type === 'people'
      ? theme.customPeopleLabelColor
      : ''};
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
  width: ${({ fullScreen }) =>
    fullScreen ? 'calc(50% - 2rem)' : 'calc(100% - 3rem)'};
  position: absolute;
  display: flex;
  bottom: ${({ articlePosition, isActiveScreenSelected }) =>
    articlePosition !== '' && isActiveScreenSelected
      ? '15rem'
      : articlePosition !== ''
      ? '0.5rem'
      : '2.5rem'};
  right: 1.5rem;
  align-items: center;
  justify-content: space-between;
  z-index: 30;
  & > :first-child {
    margin-left: auto;
    margin-right: auto;
  }
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
    height: 30rem;
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
    height: 22rem;
    max-height: 22rem;
  }
`;
export const TabPopwpr = styled.div`
  width: 100%;
  position: static;
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
  overflow-x: auto;
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
  /* position: ${({ isSavePopup }) =>
    isSavePopup ? 'relative' : 'absolute'}; */
  /* position: absolute; */
  /* width: 5.75rem; */
  display: flex;
  /* z-index: ${({ isSavePopup }) => (isSavePopup ? '0' : '1')}; */
  /* justify-content: ${({ isSavePopup }) =>
    isSavePopup ? 'flex-end' : 'space-between'}; */
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
export const IcondownWrp = styled.div`
  margin-top: 0.25rem;
`;
export const SaveSearchBtn = styled.div`
  background: ${({ theme, disabled }) =>
    disabled ? '#C3C7D9' : theme.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  color: ${({ theme }) => theme.logoText};
  margin-left: auto;
  box-sizing: border-box;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.25rem;
  padding: 0.5rem 0.8125rem;
  border-radius: 0.3125rem;

  cursor: pointer;
  &:hover {
    transition: background 0.2s ease;
    background: #857ef5;
  }

  &:active {
    background: #524bc2;
  }
`;
export const ButtonText = styled.span`
  /* text styling */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  color: ${({ theme }) => theme.logoText};
  background: rgb(0, 0, 0, 0);
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

export const EditorWrapper = styled.div`
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
  margin-top: 3rem;
  overflow-x: auto;
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
  ${({ position }) =>
    !position?.includes('bottom') &&
    css`
      left: -4rem;
      bottom: ${({ isParentComponentFixed }) =>
        isParentComponentFixed ? '7rem' : '1.5rem'};
    `}

  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  height: auto;
  width: 9.5rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1.25rem;
  background: #fff;
  border-radius: 0.5rem;
  gap: 0rem;
  flex-direction: column;
  z-index: 30;
  box-shadow: rgb(195, 199, 217) 1px 10px 10px 1px;
`;

export const SortOption = styled.div`
  color: ${({ theme, selected }) =>
    selected ? theme.primary : theme.secondaryText};
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  list-style-type: none;
  font-weight: ${({ selected }) => (selected ? '500' : '400')};
  line-height: 1rem;
  padding-bottom: 0.5rem;
  letter-spacing: -0.01625rem;
  flex-shrink: 0;
  margin: 0.45rem 0rem;
  cursor: pointer;
  display: flex;
  border-bottom: 0.2px solid rgb(232, 232, 232);
  justify-content: flex-start;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
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

export const DropdownForButton = styled.div`
  width: auto;
  height: auto;
  margin-left: auto;
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
  background-color: #fff;
  border-radius: 0.3125rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px 0px;
  border-radius: 0.375rem;
  animation: 600ms ease-in-out;
  /* & :hover {
    transition: background 0.5s ease;
    background: #857ef5;
  } */
`;

export const DropDown = styled.div`
  font-size: 0.8125rem;
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
  color: ${({ theme }) => theme.secondaryText};
  background: ${({ theme, disabled }) => (disabled ? '#C3C7D9' : '#fff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    /* transition: background 0.2s ease; */
    color: #857ef5;
  }

  /* &:active {
    background: #524bc2;
  } */
`;
const slideAnimation = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;
const slideOutAnimation = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

export const ArticleSectionComponentWrp = styled.div`
  position: fixed;
  width: ${({ activeScreen }) =>
    activeScreen === ''
      ? `${fullWidth - dashboardWidth - margin + 0.5}vw`
      : `${dashboardWidth - margin * 2.35}vw`};
  height: 93.25vh;
  top: ${({ isArticleScreenExplanded }) =>
    isArticleScreenExplanded ? '0rem' : '3rem'};
  display: flex;
  gap: 0.5rem;
  z-index: 100;
  justify-content: space-between;
  ${({ articlePosition }) =>
    articlePosition === 'left'
      ? css`
          animation: ${slideOutAnimation} 600ms ease;
          left: 1.5rem;
          flex-direction: row-reverse;
        `
      : articlePosition === 'right'
      ? css`
          animation: ${slideAnimation} 600ms ease;
          right: 1.5rem;
          flex-direction: row;
        `
      : css`
          transition: opacity 400ms ease-in, transform 10ms 400ms ease-in,
            flex-direction 10ms 400ms ease-in, right 10ms 400ms ease-in;
          opacity: 0;
          right: 100%;
          transform: translateX(-100%);
          flex-direction: row;
        `}
  ${({ activeScreen }) =>
    activeScreen !== '' &&
    `
    ${ArticleSection} {
      padding: 0.25rem;
    }
  `};
`;

export const IconWrp = styled.div`
  cursor: pointer;
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  align-items: center;
  justify-content: center;
  left: ${({ articlePosition }) =>
    articlePosition === 'left' ? 'calc(50% - 1rem)' : 'calc(50% - 0.25rem)'};
  z-index: 10;
  background-color: #fff;
  border-radius: 50%;
`;

export const GraphNoDataText = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.disabledBtnColor};
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: center;
  align-items: center !important;
`;

export const SelectedLgth = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  padding-top: 0.2rem;
  border-radius: 6px;
  background-color: #5f39f8;
  color: #fff;
  text-align: center;
`;
