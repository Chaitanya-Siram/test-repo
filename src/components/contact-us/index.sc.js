import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;
  align-self: stretch;
  width: 100%;
`;

export const SideDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const SideDivHeading = styled.p`
  color: var(--primary-8676-ff, #675ef2);
  /* AMX_Style/Subtitle_17px_Bold */
  font-family: Inter;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem; /* 117.647% */
  letter-spacing: -0.01063rem;
  margin: 0px;
`;

export const SideDivTextDiv = styled.div`
  background-color: #fff;
`;

export const SideDivTextDivUl = styled.ul`
  margin: 0px;
  padding-left: 12px;
`;

export const SideDivTextList = styled.li`
  color: var(--grey-dark-2, #161a34);
  /* AMX_Style/Txt_13px_Regular */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
`;

export const AboutUsForm = styled.form`
  flex-shrink: 0;
  border-radius: var(--corner-10-px, 0.625rem);
  background: #fff;
  padding: 0.92rem 1.41rem 1.88rem 1.88rem;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  width: 31.68431rem;
  position: relative;
`;

export const FormKeyValuePairContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4375rem;
  align-self: stretch;
  margin-top: 1.2rem;
  width: 100%;
  cursor: pointer;
`;

export const Valueholder = styled.p`
  color: var(--grey-dark-2, #161a34);

  /* AMX_Style/Txt_13px_Medium */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0px;
`;

export const Keyholder = styled.input`
  width: 100%;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: var(--corner-5-px, 0.3125rem);
  border: 1px solid var(--grey-border-drak, #c3c7d9);
  background: #fff;
  padding-left: 0.5rem;
`;
export const KeyholderNumber = styled.input`
  // this code removes the spinner counter, to input type as number
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  width: 100%;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: var(--corner-5-px, 0.3125rem);
  border: 1px solid var(--grey-border-drak, #c3c7d9);
  background: #fff;
  padding-left: 0.5rem;
`;
// drop-down
export const DropDownDiv = styled.div`
  width: 100%;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  border: 1px solid #c3c7d9;
  background: #fff;
`;

export const DropDownDivWraper = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;
`;

export const DropDownChoosedPlaceholder = styled.div`
  color: var(--grey-dark-2, #161a34);
  /* AMX_Style/Txt_13px_Medium */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  position: absolute;
  padding: 0.5rem 0rem 0.5rem 0.5rem;
`;

export const DropDownButtonWraper = styled.div`
  width: auto;
  height: auto;
  flex-shrink: 0;
  margin: 0.8rem 0.69rem 0.76rem 27rem;
  //  position: relative;
`;

export const UlListDropDown = styled.ul`
  height: auto;
  width: 100%;
  margin: 0rem;
  padding: 0rem;
  position: relative;
  border-radius: 0.3125rem;
  border: 1px solid #c3c7d9;
  background: #fff;
`;

export const ListItems = styled.li`
  height: 2.5rem;
  width: 100%;
  color: var(--grey-dark-2, #161a34);
  /* AMX_Style/Txt_13px_Medium */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  &:hover {
    background-color: #675ef2;
    color: white;
  }
`;
// end
export const Textarea = styled.textarea`
  width: 100%;
  height: 9.563rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  border: 1px solid #c3c7d9;
  background: rgba(236, 239, 243, 0.3);
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  font-family: Inter;
  resize: none;
`;

export const Buttonwrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;
  margin-top: 0.94rem;
`;

export const DivBottom = styled.div`
  display: flex;
  width: 100%;
  padding: 3rem 0rem 1rem;
  align-items: flex-start;
  gap: 1.25rem;
  background: #fff;
`;

export const DivBottomCont = styled.div`
  width: 26.875rem;
  height: 8.14675rem;
  flex-shrink: 0;
  border-radius: var(--corner-5-px, 0.3125rem);
  border: 1px solid var(--grey-border-light, #e8e8e8);
  background: var(--grey-white, #fff);
`;

export const DivBottomDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4375rem;
  float: right;
  width: auto;
`;

export const DivBottomDetailsHeading = styled.p`
  color: var(--primary-8676-ff, #675ef2);

  /* AMX_Style/Subtitle_17px_Bold */
  font-family: Inter;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem; /* 117.647% */
  letter-spacing: -0.01063rem;
  margin: 0px;
`;

export const DivBottomDetailsText = styled.p`
  margin-top: 0.44rem;
  color: var(--grey-grey-2, #585858);
  /* AMX_Style/Txt_13px_Regular */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0px;
  width: auto;
`;

export const LinkTag = styled.a`
  color: var(--primary-8676-ff, #675ef2);
  /* AMX_Style/Txt_13px_Regular */
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  text-decoration: none;
`;

export const BottomDivEntireContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.875rem;
  margin-top: 1.875rem;
  margin-left: 1.14rem;
  margin-right: 1.92rem;
  margin-bottom: 1.9rem;
`;

export const WrongInput = styled.p`
  color: #ff0000;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin-top: 4.15rem;
  position: absolute;
`;

export const Button = styled.button`
  display: flex;
  padding: 0.8125rem 1.25rem;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--primary-8676-ff, #675ef2);
  border: none;
  color: white;
  font-weight: 700;
`;
