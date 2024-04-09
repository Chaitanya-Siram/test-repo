import styled from 'styled-components/macro';

export const DropdownCont = styled.ul`
  margin: 0;
  padding: 1.25rem;
  color: #000;
  background: #fff;
  border-radius: 0.5rem;
  display: flex;
  gap: 0rem;
  width: 22.5rem;
  flex-direction: column;
  overflow: auto;
`;

export const DropdownHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

export const DropdownDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  h4 {
    color: #000;
    font-size: 1.0625rem;
    margin: 0;
    line-height: 20px;
  }
  p {
    font-size: 0.75rem;
    color: #656b8a;
    font-family: Inter;
    margin: 0 0 1rem;
  }
`;

export const DropdownHeaderCloseIcon = styled.div`
  width: 24px;
  cursor: pointer;
`;

export const DropdownItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ItemArrowWrapper = styled.div`
  cursor: pointer;
  display: flex;
`;

export const DropdownItems = styled.li`
  /* color: var(--grey-white, #fff); */
  /* AMX_Style/Txt_13px_Bold */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  list-style-type: none;
  font-weight: 700;
  line-height: 1rem; /* 123.077% */
  letter-spacing: -0.01625rem;
  width: 100%;
  padding: 12px 20px;
  flex-shrink: 0;
  cursor: pointer;
  border: 1px solid
    ${({ theme, expanded }) => (expanded ? theme.primary : '#e8e8e8')};
  border-radius: 10px;
`;
export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ItemLeftContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  img {
    margin-right: 0.625rem;
    width: 30px;
    height: 30px;
  }
`;

export const ItemTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #585858;
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  width: 100%;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
export const ItemSubText = styled.div`
  font-size: 0.8125rem;
  font-weight: 400;
  color: #656b8a;
`;
export const SubListWrap = styled.div`
  margin-top: 10px;
`;
