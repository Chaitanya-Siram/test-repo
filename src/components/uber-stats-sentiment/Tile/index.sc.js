import styled from 'styled-components';

export const Tile = styled.div`
  display: flex;
  width: 16.85rem;
  height: 100%;
  padding: 0.5rem 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 1.25rem;
  border: 1px solid #ebebeb;
  background: #fff;
`;

export const TileTitle = styled.div`
  margin: 0;
  padding: 0;
  color: #000;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
  text-overflow: ellipsis;
`;

export const TileDataWrp = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  flex-direction: column;
`;

export const TileData = styled.p`
  color: #000;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 2rem;
  letter-spacing: -0.028rem;
  padding: 0;
  margin: 0;
`;
export const PercentWrp = styled.span`
  color: #999;
  font-size: 0.9rem;
`;

export const Change = styled.div`
  color: #5c5e60;
  font-size: 0.8375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; /* 106.667% */
  letter-spacing: -0.01875rem;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  /* gap: 0.2rem; */
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

export const TypeWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* border: 2px solid red; */
`;

export const ArticleTypeWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 1rem 0.15rem 0.25rem 0.15rem;
`;

export const TypeText = styled.p`
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem; /* 123.077% */
  letter-spacing: -0.01625rem;
  margin: 0;
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const ChangeWrp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 0.15rem 0.25rem 0.25rem;
`;
