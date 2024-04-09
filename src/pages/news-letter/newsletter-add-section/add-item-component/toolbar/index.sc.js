import styled from 'styled-components';

export const ToolBarWrp = styled.div`
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid var(--others-light, #c3c7d9);
  background: #fff;
  /* Dropshadow_1 */
  box-shadow: 0px 8px 8px 0px rgba(153, 153, 153, 0.3);
  /* width: 9rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 1rem 0.625rem;
  z-index: 100;
`;

export const RotateWrp = styled.div`
  transform: rotateX(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconTxtWrp = styled.div`
  width: 9.5rem;

  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
`;

export const ToolTipTxt = styled.div`
  height: 1.25rem;
  width: 8rem;
  color: ${({ theme }) => theme.darkText};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
  text-align: left;
`;
