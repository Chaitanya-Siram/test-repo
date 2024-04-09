import styled, { css } from 'styled-components/macro';

export const BottomBarWrp = styled.div`
  display: inline-flex;
  height: 7.5rem;
  width: 100%;
  padding: 0rem 1.25rem;
  align-items: center;
  background: ${({ theme }) => theme.background};
  border-radius: 0rem 0rem 0.625rem 0.625rem;
  border-top: 1px solid ${({ theme }) => theme.shadow};
  justify-content: space-between;
  gap: 0.625rem;
`;

export const VerticalLine = styled.div`
  width: 0.0625rem;
  height: 100%;
  background: ${({ theme }) => theme.shadow};
`;

export const SwichBox = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  gap: 0.25rem;
  width: ${({ width }) => width};
  border-width: 0 0 0 1px;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  & > div > div.iconpop {
    min-width: 2.5rem;
  }
`;

export const SelectedWrp = styled.div`
  display: flex;
  width: fit-content;
  padding: 0.375rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  flex-shrink: 0;
  background: ${({ theme }) => theme.background};
  border-radius: 0.3125rem;
  border: 1px solid ${({ theme }) => theme.borders};
  height: 2.5rem;
`;

export const SelectedText = styled.p`
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.primary};
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; /* 123.077% */
  letter-spacing: -0.01625rem;
`;

export const SelectedPopupWrap = styled.div`
  border-radius: 1.875rem;
  border: 1px solid var(--grey-border-drak, #c3c7d9);
  background: var(--text-white, #fff);
  padding: 0.3125rem 0.5rem;
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  height: 1.5rem;
`;
export const SelectedPopupText = styled.p`
  color: var(--grey-grey-2, #585858);
  /* AMX_Style/Txt_12px_Regular */
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
`;

export const TimeBox = styled.div`
  display: flex;
  gap: 0.625rem;
  & > div {
  }
  border-width: 0 0 0 1px;
  height: 100%;
  width: 32%;
`;

export const Boldtxtwpr = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  padding: 0;
  margin: 1.3rem 0rem 0.35rem 0rem;
`;

export const Lightwpr = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.secondaryText};
  font-weight: 600;
  font-size: 0.95rem;
  width: 100%;
  opacity: ${(props) => (props.opacity ? '1' : '0.5')};
  background-color: ${({ theme }) => theme.newsLetterBackground};
  cursor: pointer;
  padding: 0.24rem 0.36rem;
  border-radius: 0.3125rem;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
`;

export const Popbtnwpr = styled.div`
  border-radius: 0.3125rem;
  cursor: pointer;
  background: ${({ theme }) => theme.newsLetterBackground};
  padding: 0.24rem 0.4rem;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.813rem;
  width: 100%;
  display: flex;
  align-items: center;
  & > span {
    display: flex;
    align-items: center;
  }

  position: relative;
  min-height: 2.5rem;
`;

export const EmailBox = styled.div`
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
  gap: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: scroll;
  height: 2.5rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const EmailPop = styled.div`
  height: fit-content;
  position: relative;
  width: 100%;
  right: 0px;
  z-index: 1000;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 0.625rem;
  box-shadow: rgba(153, 153, 153, 0.3) 0px 8px 8px;
  overflow: auto;
  margin-top: 0.5rem;
  gap: 0.5rem;
  border: 1px solid rgb(195, 199, 217);
`;

export const PopUpMiddleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: row;
  width: 100%;
`;
export const PopupBottomWrap = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.375rem;
  flex-wrap: wrap;
  width: 100%;
  max-height: 15rem;
  overflow: auto;
`;
export const DateLabelsWrp = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  text-wrap: nowrap;
`;
export const SelectedDatePickerWrp = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const AllDaysWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;
export const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 1px solid #675ef2;
  background-color: ${(props) =>
    props.checked ? props.backgroundColor : '#FFFFFF'};
  transition: all 150ms;
  border-radius: 0.25rem;
  &:after {
    display: ${(props) => (props.checked ? 'block' : 'none')};
    text-align: center;
    color: ${(props) => props.checkColor};
    font-size: 0.7rem;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const DailyDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
export const AllDaysText = styled.div`
  color: var(--grey-dark-2, #161a34);
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Inputwpr = styled.input`
  border-radius: 0.375rem;
  border: 1px solid var(--grey-border-light, #e8e8e8);
  background: #fff;
  padding: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.secondaryText};
  background: ${({ theme }) => theme.secondaryBackground};
  outline: none !important;
  width: 100%;
`;

export const BtnWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PopupBottonWrp = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ErrorText = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.inActiveStatusBtnText};
  font-size: 0.6125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  text-align: center;
`;

export const Popupheader = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: left;
`;

// my code
export const DatePopUp = styled.div`
  width: fit-content;
  height: auto;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0.625rem;
  box-shadow: 0px 8px 8px rgba(153, 153, 153, 0.3);
  position: relative;
  z-index: 10;
  border: 1px solid #c3c7d9;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const DateForm = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LabelInputCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.3rem;
  border-radius: 0.375rem;
  background: #fff;
`;

export const LabelCustm = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.secondaryText};
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
`;

export const RadioBtnCustm = styled.input`
  margin: 0;
  font-size: 0.8125rem;
  margin-right: 0.5rem;
  &:hover {
    cursor: pointer;
  }
  &:checked {
    accent-color: ${({ theme }) => theme.primary};
  }
`;

export const InputDate = styled.input`
  padding: 0.5rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.secondayText};
  background: #fff;
  outline: none !important;
  width: 100%;
  border: 1px solid var(--grey-border-light, #e8e8e8);
  background: #fff;
  border-radius: 0.375rem;
  height: 2.125rem;
 /* ${({ hasTime, theme }) => !hasTime && `color: ${theme.shadow};`} */
`;

export const DaysContWrp = styled.div`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DaysTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.77088rem;
  height: 1.625rem;
  padding: 0.3rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.primary};
  margin-right: 0.25rem;
  cursor: pointer;

  ${({ selected }) =>
    selected
      ? css({
          backgroundColor: '#675EF2',
          borderRadius: '1.375rem',
          color: '#fff',
        })
      : ''}
`;

export const DropDownButton = styled.div`
  border: 1px solid ${({ theme }) => theme.shadow};
  padding: 0.5rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.secondaryText};
  background: ${({ theme }) => theme.secondaryBackground};
  border-radius: 0.25rem;
  outline: none !important;
  width: 100%;
  cursor: pointer;
`;

export const ListContainer = styled.div`
  width: 100%;
  height: 12.5rem;
  overflow-y: scroll;
  background: #fff;
  margin-top: -0.5rem;
`;

export const UnorderedList = styled.ul`
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
`;

export const ListItems = styled.li`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

export const TimePopUp = styled.div`
  width: 13rem;
  height: auto;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0.625rem;
  box-shadow: 0px 8px 8px rgba(153, 153, 153, 0.3);
  position: relative;
  z-index: 10;
  border: 1px solid #c3c7d9;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
`;
export const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.5rem;
`;

export const SubmitButton = styled.button`
  width: 4rem;
  border: none;
  height: auto;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: var(--primary-8676-ff, #675ef2);
  margin-top: 0.5rem;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const SubmitButtonText = styled.h3`
  font-family: Inter;
  color: #fff;
  margin: 0;
`;
