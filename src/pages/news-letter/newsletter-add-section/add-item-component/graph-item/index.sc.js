import styled from 'styled-components';

export const GraphWrp = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.background};
  height: ${({ graphType }) => (graphType === 'chart2' ? '31rem' : '100%')};
`;

export const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  // padding: 4rem 1.625rem;
  cursor: pointer;
`;

export const ImageTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #161a34;
  width: 95%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GraphImage = styled.img`
  width: 100%;
  height: 95%;
  margin: 1rem 0;
`;
