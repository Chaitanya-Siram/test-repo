import styled from 'styled-components';

export const MainWrp = styled.div`
  margin: 0rem 2.5rem;
`;

export const SectionWrp = styled.div`
  height: 89vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ProfileTopWrp = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 1rem 1.96rem;
  background-color: ${({ theme }) => theme.background};
  gap: 1.64rem;
  border-radius: 0px 0px 0.3125rem 0.3125rem;
`;

export const ProfileImage = styled.div`
  width: 4.375rem;
  height: 4.375rem;
  border-radius: 6.25rem;
  border: 5px solid ${({ theme }) => theme.background};
  background: url(${(props) => props.image}), lightgray 50% / cover no-repeat;
  left: 5.9rem;
  bottom: 0.78rem;
  background-size: contain;
`;

export const TopWrp = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.88rem;
  width: 100%;
`;

export const NameWrp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
`;

export const NameText = styled.h4`
  margin: 0;
  padding: 0;
  color: '#000000';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5625rem; /* 125% */
  letter-spacing: -0.025rem;
`;
export const OccupationText = styled.p`
  margin: 0;
  padding: 0;
  color: ${(theme) => theme.text};

  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
`;

export const TagWrp = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.3125rem;
`;

export const JournalistWrp = styled.div`
  display: flex;
  padding: 0.3125rem 0.625rem 0.25rem 0.375rem;
  align-items: flex-start;
  justify-content: center;
  gap: 0.25rem;
  border-radius: 0.1875rem;
  background: rgba(255, 104, 136, 0.2);
`;

export const JournalistText = styled.p`
  margin: 0;
  padding: 0;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #ed3f47;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: 0.9375rem;
`;

export const TopAuthorWrp = styled.div`
  width: 5.5rem;
  height: 1.5rem;
  border-radius: 0.188rem;
  background: rgba(103, 94, 242, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  align-items: center;
  display: flex;
`;

export const TopAuthorText = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 0.9375rem;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const ContentWrp = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.newsLetterBackground};
  padding: 1.28rem 0;
  display: flex;
  gap: 1.26rem;
`;

export const ContentLeftSecWrp = styled.div`
  width: 24%;
  height: fit-content;
  background: #ffffff;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.75rem;
`;
export const ContentRightSecWrp = styled.div`
  width: 76%;
  border-radius: 0.625rem;
  gap: 0.75rem;
  display: flex;
  flex-direction: column;
`;

export const ArticlesWrp = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.625rem;
  border-radius: 0.3125rem;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
`;

export const TabsWrp = styled.div`
  display: flex;
  gap: 0;
  padding: 1.25rem 0rem 0rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.newsLetterBackground};
`;

export const Tab = styled.div`
  display: flex;
  padding: 0.75rem 0.625rem;
  align-items: flex-start;
  gap: 0.625rem;
  box-shadow: ${(props) =>
    props.selected ? '0px -3px 0px 0px #2e68ff inset' : ''};
  cursor: pointer;
`;

export const TabLabel = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props) => (props.selected ? '#2e68ff' : '#555555')};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem;
`;

export const ArticlesSection = styled.div`
  width: 100%;
  display: flex;
`;

export const LeftSec = styled.div`
  width: 66%;
  display: flex;
  flex-direction: column;
`;
export const ChartSec = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex-shrink: 0;
  border-bottom: ${({ left }) =>
    left ? '2px solid var(--greys-g-01, #eceff3)' : 'none'};
`;

export const ChartSecHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 1.25rem 1.25rem 0.75rem 1.25rem;
  justify-content: space-between;
  align-items: center;
`;

export const GraphWrp = styled.div`
  width: 100%;
  height: 13rem;
  padding: 1.25rem 1.25rem 0.75rem 1.25rem;

  .x.axis > .tick > text,
  .y.axis > .tick > text {
    fill: ${({ theme }) => theme.graphAxisColor || '#000'};
    font-size: 0.5625rem;
    font-style: normal;
    font-weight: 500;
     text-transform: capitalize;
  }

  .y.axis > .domain,
  .x.axis > .domain {
    display: none;
  }
`;

export const GraphWrpRight = styled.div`
  width: 100%;
  height: 100%;
  height: 21rem;
  padding: 1.25rem 1.25rem 0.75rem 1.25rem;
  .axis > text {
    fill: ${({ theme }) => theme.text || '#000'};
  }

  .axis > text.legend-value {
    fill: ${({ theme }) => theme.tabInactive || '#000'};
  }

  .legend {
    font-size: 0.55rem;
  }

  .legend-value {
    font-size: 0.7rem;
    font-weight: 600;
  }

  .axisLabel {
    display: none;
  }
`;

export const Reachtext = styled.p`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.tableHeaderColor};
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
`;

export const ReachnNbr = styled.span`
  margin: 0;
  padding: 0;
  color: #000000;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
`;

export const DropdownWrp = styled.div`
  display: flex;
  padding: 0.25rem 0rem;
  gap: 0.25rem;
  position: relative;
  align-items: center;
`;

export const Dropdowntext = styled.p`
  color: ${({ theme }) => theme.darkText};
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

export const DropdownOption = styled.p`
  color: ${({ theme }) => theme.darkText};
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  padding: 0.5rem 0.9rem;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
  }
`;

export const DropDownWrp = styled.div`
  position: absolute;
  left: 0;
  top: 1.25rem;
  background: lightblue;
  z-index: 10;
  padding: 0.625rem;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 10rem;
`;

export const RightSec = styled.div`
  width: 34%;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.newsLetterBackground};
  border-left: 1px solid ${({ theme }) => theme.newsLetterBackground};
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TwitterSec = styled.div`
  min-height: 22.5rem;
  padding: 1.25rem;
`;

export const ArticlesSecHeader = styled.div`
  width: 100%;
  display: flex;
  height: 5rem;
  padding: 1.25rem 1.25rem 0.75rem 1.25rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.newsLetterBackground};
`;
