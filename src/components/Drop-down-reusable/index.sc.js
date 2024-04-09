import styled from 'styled-components/macro';

export const CreateDashboardButton = styled.button`
  display: flex;
  padding: 0.5rem 0.8125rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.313rem;
  background: var(--primary-8676-ff, #675ef2);
  border: none;
  /* width: 11rem; */
  cursor: pointer;
  &:hover {
    transition: background 0.2s ease;
    background: #857ef5;
  }

  &:active {
    background: #524bc2;
  }
`;

export const ButtonTextTwo = styled.p`
  color: var(--grey-white, #fff);

  /* AMX_Style/Txt_13px_Medium */
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0rem;
`;

export const DropdownWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
  gap: 0px;
  align-items: flex-end;
`;

export const DropdownSecondaryItem = styled.li`
  color: #fff;
  /* AMX_Style/Txt_13px_Medium */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin-left: 1.5rem;
  border: 1px solid red;
`;

export const PopoverAbsContainer = styled.div`
  position: absolute;
  box-shadow: 0px 10px 20px 0px #00000033;
  z-index: 2;
  margin-top: 3rem;
  /* height: 27.6rem; */
  border-radius: 0.5rem;
  overflow-y: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
