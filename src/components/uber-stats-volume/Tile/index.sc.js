import styled from 'styled-components';

export const Tile = styled.div`
  display: flex;
  min-width: calc(33.33% - 0.5rem);
  height: 100%;
  padding: 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  background: #fff;
`;

export const TileTitle = styled.div`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.volumeGraphTitleColor};
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
  letter-spacing: -0.02rem;
  text-overflow: ellipsis;
`;

export const TileDataWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
`;

export const TileData = styled.p`
  color: #000;
  display: flex;
  align-items: center;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.0275rem;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
`;

export const Change = styled.div`
  display: flex;
  align-items: center;
  color: ${({ isIncreased, theme }) =>
    isIncreased ? theme.isIncreasedColor : theme.isDecreasedColor};
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem;
  letter-spacing: -0.01875rem;
`;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  z-index: 0;
`;

export const ChangeWrp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.25rem;
`;

export const PercentWrp = styled.span`
  color: #000;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.0275rem;
`;
