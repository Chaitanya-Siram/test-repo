import styled from 'styled-components';

export const Wrpr = styled.div`
  width: 100%;
  height: 3.25rem;
  border-radius: var(--corner-5-px, 0.3125rem) var(--corner-5-px, 0.3125rem)
    var(--corner-0-px, 0rem) var(--corner-0-px, 0rem);
  background: #fff;
  /* bottom border */
  box-shadow: 0px 1px 0px 0px #e8e8e8;
  display: flex;
  padding: 0rem 2rem 0rem 1.375rem;
  align-items: center;
  gap: -8.75rem;
  flex-shrink: 0;
`;

export const Heading = styled.h4`
  flex: 1 0 0;
  color: var(--grey-dark-2, #161a34);

  /* AMX_Style/H4 */
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5625rem; /* 125% */
  letter-spacing: -0.025rem;
`;

export const NewsLetterButton = styled.button`
  display: flex;
  padding: 0.5rem 0.8125rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-8676-ff, #675ef2);
  background: var(--grey-white, #fff);
  margin-right: 0.5rem;
  cursor: pointer;
`;

export const ButtonText = styled.p`
  color: var(--primary-8676-ff, #675ef2);

  /* AMX_Style/Txt_13px_Medium */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0rem;
`;

export const CreateDashboardButton = styled.button`
  display: flex;
  padding: 0.5rem 0.8125rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  background: var(--primary-8676-ff, #675ef2);
  border: none;
  width: 11rem;
  cursor: pointer;
`;

export const ButtonTextTwo = styled.p`
  color: var(--grey-white, #fff);

  /* AMX_Style/Txt_13px_Medium */
  font-family: Inter;
  font-size: 0.8125rem;
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

export const DropdownCont = styled.ul`
  height: auto;
  width: auto;
  margin-top: 2.5rem;
  padding: 0.75rem 1.25rem;
  position: absolute;
  background: ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
  background: var(--primary-8676-ff, #675ef2);
  display: flex;
  gap: 0rem;
  flex-direction: column;
  z-index: 2;
`;

export const DropdownItems = styled.li`
  color: var(--grey-white, #fff);
  /* AMX_Style/Txt_13px_Bold */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  list-style-type: none;
  font-weight: 700;
  line-height: 1rem; /* 123.077% */
  letter-spacing: -0.01625rem;
  width: 10.616rem;
  flex-shrink: 0;
  margin: 0.38rem 0rem;
  cursor: pointer;
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
