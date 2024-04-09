import styled from 'styled-components';

export const MainWrp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  gap: 1.25rem;
  height: 100%;
`;

export const UberTilesWrp = styled.div`
  width: 100%;
  height: 11.25rem;
  display: flex;
  gap: 0.75rem;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TileWrp = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid green; */
  border-radius: 0.5rem;
  border: 1px solid #eceff3;
`;

export const UberTilesText = styled.p`
  background: rgba(195, 199, 217, 0.2);
  color: #5c5e60;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  padding: 4px;
`;
