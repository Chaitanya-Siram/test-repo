import styled from 'styled-components';

export const Containerwraper = styled.div`
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
`;

export const IconBtnwpr = styled.button`
  width: 100%;
  height: fit-content;
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  background-color: transparent;
`;

export const IconPopwpr = styled.div`
  width: 100%;
  position: absolute;
  top: 3.5rem;
  z-index: 1000;
  padding: 0.5rem 0 0.5rem 0;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.9375rem;
  align-items: flex-start;
  gap: 0.625rem;

  box-shadow: 0px 8px 8px rgba(153, 153, 153, 0.3);
  max-height: 9.375rem;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  gap: 2px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0.3125rem;
`;

export const Itemwpr = styled.div`
  min-width: 4rem;
  display: flex;
  align-items: center;
  height: 1.5rem;
  justify-content: flex-start;
  width: 100%;
  text-align: flex-start;
  &:hover {
    background: #f5f5f5;
  }
  color: var(--grey-dark-2, #161a34);

  /* AMX_Style/Txt_13px_Regular */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  color: ${({ theme, selected }) =>
    selected ? theme.primary : theme.secondaryText};
  cursor: pointer;
`;
