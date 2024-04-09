import styled from 'styled-components';

export const themes = [
  {
    key: 1,
    label: 'Theme 1',
    positive: '40%',
    negative: '60%',
  },
  {
    key: 2,
    label: 'Theme 2',
    positive: '20%',
    negative: '80%',
  },
  {
    key: 3,
    label: 'Theme 3',
    positive: '80%',
    negative: '20%',
  },
  {
    key: 4,
    label: 'Theme 4',
    positive: '75%',
    negative: '25%',
  },
  {
    key: 5,
    label: 'Theme 5',
    positive: '32%',
    negative: '68%',
  },
];

export const Titlewrpr = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  color: #000000;
`;

export const GraphBoxwrpr = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  height: 90%;
  transition: 0.3 ease-in-out;
  position: absolute;
  z-index: 1;
`;

export const BarContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1.75rem;
`;

export const LabelWrapper = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.68rem;
  color: #585858;
  width: 10%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BarBoxwrpe = styled.div`
  display: flex;
  gap: ${({ config }) => (config?.barGap ? config?.barGap : '0.5rem')};
  width: calc(90% - 1.75rem);
`;

export const Barwrpr = styled.div`
  display: flex;
  justify-content: ${({ first, last }) =>
    first ? 'flex-end' : last ? 'flex-start' : 'center'};
  width: 50%;
  display: flex;
  gap: 0.5rem;
  .selected {
    transition: all 400ms ease;
    opacity: 1;
  }
  .hover-selected {
    transition: all 400ms ease;
    opacity: 1 !important;
  }

  .unselected {
    transition: all 400ms ease;
    opacity: 0.2;
  }
  .hover-unselected {
    transition: all 400ms ease;
    opacity: 0.2 !important;
  }
`;

export const Bar = styled.div`
  width: calc(${(props) => props.width} - 3rem);
  height: 1rem;
  background-color: ${(props) => props.color};
  transition: 0.2s ease-in-out;
`;

export const Infowrpr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 1rem;
`;

export const Justwpr = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const Square = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background: ${(props) => props.background};
`;

export const Textwpr = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75rem;
  color: #585858;
  display: flex;
  align-items: center;
`;

// below is for Sentiment style
//
export const Boxwrpr = styled.div`
  box-sizing: border-box;
  width: 750px;
  background: #ffffff;
  box-shadow: 0px 8px 8px rgba(153, 153, 153, 0.12);
  border-radius: 0.625rem;
  padding: 2rem;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  & > svg {
    cursor: pointer;
  }
`;

export const Deswrpr = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #000000;
`;

export const LableSec = styled.section`
  font-size: 0.68rem;
  font-weight: 600;
  color: black;
  width: 2.5rem;
  display: flex;
  justify-content: center;
`;

export const GridMainWrp = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1.75rem;
`;
export const GridMainLeft = styled.div`
  width: 10%;
  height: 100%;
`;
export const GridMainRight = styled.div`
  width: calc(90% - 1.75rem);
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const GridWrp = styled.div``;
export const GridWrpLeft = styled.div`
  width: calc(50% - 3rem);
  height: 100%;
  position: relative;
`;
export const GridWrpRight = styled.div`
  width: calc(50% - 3rem);
  height: 100%;
  position: relative;
`;
export const Gridline = styled.div`
  height: calc(100% - 1.5rem);
  width: 0.1rem;
  position: absolute;
  background-image: linear-gradient(#d9dbde 33%, rgba(255, 255, 255, 0) 0%);
  background-position: right;
  background-size: 0.1rem 0.75rem;
  background-repeat: repeat-y;
`;
export const GridLineLabel = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 3rem;
  color: #5c5e60;
  font-size: 0.75rem;
`;
