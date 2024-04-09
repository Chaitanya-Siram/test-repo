import styled from 'styled-components';

export const Containerwraper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
`;

export const IconBtnwpr = styled.button`
  width: fit-content;
  height: fit-content;
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  background-color: transparent;
`;

export const IconPopwpr = styled.div`
  position: absolute;
  top: calc(2.5rem + 3px);
  right: -2px;
  z-index: 1000;
  padding: 0.5rem 0.5rem 0.5rem 1.25rem;
  background: ${({ theme }) => theme.secondaryBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border: 1px solid #d1d5dc;
  box-shadow: 0px 8px 8px rgba(153, 153, 153, 0.3);
  border-radius: 10px;
  max-height: 9.375rem;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  gap: 4px;
`;

export const Itemwpr = styled.div`
  min-width: 4rem;
  display: flex;
  align-items: center;
  height: 1.5rem;
  justify-content: flex-start;
  text-align: flex-start;
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;
