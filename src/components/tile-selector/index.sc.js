import styled from 'styled-components/macro';

export const ItemBoxwpr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 1.1rem;
  transition: 0.2s ease-in-out;
  width: 10.75rem;
  border-radius: 10px;
  height: 8rem;
  aspect-ratio: 1/0.93;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;
  background: ${({ checked, theme, BydefaultChecked }) =>
    BydefaultChecked || checked ? theme.primary : '#FFFFFF'};
  margin-bottom: 0.5rem;
  border: ${({ checked, theme, BydefaultChecked }) =>
    BydefaultChecked || checked
      ? `3px solid ${theme.primary}`
      : '1px solid #E8E8E8'};
  & .writeicon {
    display: ${({ checked, BydefaultChecked }) =>
      BydefaultChecked || checked ? 'flex' : 'none'};
  }
  & > div > svg > path {
    stroke: ${({ checked, theme, BydefaultChecked }) =>
      BydefaultChecked || checked ? theme.background : '#999999'};
  }
  &:hover {
    border: ${({ checked, theme, BydefaultChecked }) =>
      BydefaultChecked || checked ? '' : `3px solid ${theme.primary}`};
    & .writeicon {
      display: ${({ checked, BydefaultChecked }) =>
        BydefaultChecked || checked ? '' : 'flex'};
    }
    & > div > svg > path {
      stroke: ${({ checked, BydefaultChecked }) =>
        BydefaultChecked || checked ? '' : '#999999'};
    }
  }
  & > div {
    color: ${({ checked, theme, BydefaultChecked }) =>
      BydefaultChecked || checked ? theme.background : ''};
  }
  > div > div {
    color: ${({ checked, theme, BydefaultChecked }) =>
      BydefaultChecked || checked ? theme.background : ''};
  }
  > div > span {
    color: ${({ checked, theme, BydefaultChecked }) =>
      BydefaultChecked || checked ? theme.background : ''};
  }
  position: relative;

  cursor: ${({ BydefaultChecked }) =>
    BydefaultChecked ? 'not-allowed' : 'pointer'};
`;

export const ItemTypeBoxwpr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const WriteIconwpr = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  row-gap: 0.45rem;
  column-gap: 0.75rem;
`;
