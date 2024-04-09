import styled from 'styled-components';

export const ArticleToolWrp = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 9.75rem;
  height: 2rem;
  /* top: 540px; */
  padding: 0.1rem;
  border-radius: 12px;
  border: 1px;
  gap: 0.5rem;
  z-index: 100;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 12px 12px 0px #0000001f;
  background-color: #ffffff;
  left: -9.75rem;
  top: 0.6rem;
`;

export const IconWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const ArticleRotateWrp = styled.div`
  transform: rotateX(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const DropDownWrp = styled.ul`
  border: 1px solid #dfdfdf;
  width: fit-content;
  height: fit-content;
  /* position: relative; */
  left: -8rem;
  border-radius: 12px;
  border: 1px solid #dfdfdf;
  gap: 0.5rem;
  z-index: 100;
  background-color: #ffffff;
  position: absolute;
  top: 2.6rem;
  left: -6.3rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

export const DropDownValueWrp = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.6rem;
  cursor: pointer;
`;

export const DropDownCheckBox = styled.input``;

export const DropDownValue = styled.label`
  width: 100%;
  height: 1rem;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #000000;
  cursor: pointer !important;
`;
