import styled from 'styled-components';

export const SelectTempIconWrp = styled.div`
  display: ${({ showOpts }) => (showOpts ? 'block' : 'none')};
  position: absolute;
  z-index: 1;
  width: 2.75rem;
  height: 2.75rem;
  ${({ align }) => (align === 'left' ? 'left: -2.75rem;' : 'right: -2.75rem;')}
  top: 0;
  /* top: 303px; */
  /* left: 1128px; */
  padding: 0.8rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  cursor: pointer;
  border: 1px solid var(--others-light, #c3c7d9);
`;

export const DropDownListWrp = styled.ul`
  border: 1px solid var(--others-light, #c3c7d9);
  width: fit-content;
  height: fit-content;
  margin-top: 3rem;
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px;
  gap: 0.5rem;
  z-index: 2;
  background-color: #ffffff;
  box-shadow: 0px 12px 12px 0px #0000001f;
  position: absolute;
  ${({ align }) => (align === 'left' ? 'left: -8rem;' : 'right: -8rem;')}
  top: 0;
`;

export const DropDownList = styled.div`
  width: 100%;
  height: 1rem;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000000;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;
