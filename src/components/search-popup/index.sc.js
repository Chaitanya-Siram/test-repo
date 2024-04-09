import styled, { keyframes } from 'styled-components/macro';

export const SearchPopwrpr = styled.div`
  width: 100%;
  padding: ${(props) =>
    props.isNewsletter ? '0.625rem 1rem' : '1rem 0 0.65rem'};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.secondaryBackground};
  max-height: 90vh;
  cursor: default;
  border-radius: 0.5rem;
`;

export const SearchHeader = styled.div`
  flex-shrink: 0;
`;

export const MainTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => !props.isNewsletter && '0 1.25rem'};
`;
export const PopOverWrp = styled.div`
  width: 100%;
  position: fixed;
`;

export const MainTitlewrpr = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.secondaryText};
  min-width: fit-content;
  margin-bottom: 0.5rem;
`;

export const ButtonBoxwpr = styled.div`
  display: flex;
  padding: 0.625rem 0.93rem;
  background: ${({ theme }) => theme.primary};
  border-radius: 6px;
  height: 2.4rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.logoText};
  cursor: pointer;
`;

export const Searchwpr = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${(props) =>
    !props.isNewsletter &&
    `box-sizing: border-box;
  gap: 1rem;
  height: 3rem;
  border: 1px solid #c3c7d9;
  border-width: 1px 0;
  padding: 0.75rem;`}
`;

export const Labelwrpr = styled.label`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.isNewsletter && 'row-reverse'};
  align-items: center;
  background: ${({ theme }) => theme.secondaryBackground};
  padding: 0.75rem;
  cursor: pointer;
  ${(props) =>
    props.isNewsletter &&
    `margin: 0.9rem 0 1.1rem;
  border-radius: 10px;
  border: 1px solid #c3c7d9;
  background: #fff;
  height: 2.5rem;
  box-sizing: border-box;`}
`;

export const Inputwrpr = styled.input`
  border: none;
  outline: none;
  background: ${({ theme }) => theme.secondaryBackground};
  font-weight: 500;
  margin-left: 0.25rem;
  font-size: 13px;
  display: flex;
  width: 100%;
  &:focus {
    background: ${({ theme }) => theme.secondaryBackground};
  }
  &::placeholder {
    font-weight: 500;
    font-size: 13px;
    color: #999999;
    display: flex;
    align-items: flex-end;
  }
`;

export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  box-sizing: border-box;
  width: 1rem;
  height: 1rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
  flex-shrink: 0;
  &:checked {
    width: 1rem;
    height: 1rem;
    accent-color: #675ef2;
    border-radius: 3px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  background: #eceff3;
  width: 100%;
  height: 2.5rem;
  padding: 0rem 1.5rem;
`;
export const TopHeader = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  padding: 0rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-top-right-radius: 0.625rem;
  border-top-left-radius: 0.625rem;
`;
export const LeftWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
`;
export const TextWrp = styled.p`
  color: #585858;
  font-family: Inter;
  font-size: 0.925rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem;
  letter-spacing: -0.3px;
`;
export const DropDownWrp = styled.div`
  position: absolute;
  width: 20rem;
  top: -0.5rem;
`;
export const Framrightpr = styled.div`
  display: flex;
  min-width: 10rem;
  gap: 2rem;
`;
export const RightSideWrp = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.35rem;
  &:hover {
    cursor: pointer;
  }
`;

export const InputSearchBar = styled.input`
  padding: 2px;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  width: 70%;
`;
export const SearchIconWrp = styled.div``;
export const Framleftpr = styled.div`
  display: flex;
  width: ${(props) => (props.isPopup ? '40%' : '30%')};
  gap: 0.8rem;
  align-items: center;
  padding-right: 1rem;
`;
export const FramRightpr = styled.div`
  display: flex;
  width: ${(props) => (props.isPopup ? '60%' : '70%')};
  justify-content: flex-start;
  width: ${(props) => props.width};
`;

export const ItemWrp = styled.div`
  flex: 4;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const EditIconWrp = styled.div`
  overflow: hidden auto;
  position: absolute;
  top: 80%;
  right: 80%;
  z-index: 1;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px 0px;
  border-radius: 0.175rem;
  list-style-type: none;
  /* padding: 0.65rem; */
  margin: 0px;
  width: 100%;
  min-width: max-content;
  display: flex;
  flex-direction: column;
  animation: ${({ open }) => (open ? fadeIn : fadeOut)} 600ms ease-in-out;
`;
export const EditOption = styled.div`
  font-family: Inter;
  font-size: 0.8125rem;
  line-height: 1.125rem;
  padding: 0.5rem 0.65rem;
  font-weight: 400;
  color: rgb(88, 88, 88);
  text-align: left;

  cursor: pointer;
  background: rgb(255, 255, 255);
  &:hover {
    background: #857ef5;
    color: #fff;
  }
`;
export const ItemIconWrp = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  position: relative;
`;

export const Framewrpr = styled.div`
  cursor: ${({ point }) => (point ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  flex: 4;
  gap: 0.5rem;
`;

export const FrameIconwrpr = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: ${({ dotClick }) => (dotClick ? '0' : '2')};
  gap: 0.5rem;
`;

export const Frametxt = styled.div`
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 0.7rem;
  /* color: #5c5e60; */
  min-width: fit-content;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
  color: ${({ theme, isActive }) => (isActive ? theme.primary : '#5c5e60')};
`;

export const ContentsContainer = styled.div`
  width: 100%;
  height: 74vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 7rem;
  border-radius: var(--corner-0-px, 0px);
  background: #fff;
  box-shadow: 0px -1px 0px 0px rgba(195, 199, 217, 0.5) inset;
`;

export const Loadbtnwpr = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loadbtn = styled.div`
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.secondaryText};
  padding: 0.5rem 0.75rem;
  margin: 1rem 0 0.5rem;
  border: 1px solid ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.secondaryBackground};
  cursor: pointer;
  border-radius: 5px;
`;

export const Contentwrpr = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 6.5rem;
  padding: 1rem 1.5rem;
  background: rgb(255, 255, 255);
  box-shadow: rgba(195, 199, 217, 0.5) 0px -1px 0px 0px inset;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const MainBox = styled.div`
  display: flex;
  width: ${(props) => (props.isPopup ? '40%' : '30%')};
  gap: 0.75rem;
  padding-right: 2rem;
`;
export const DeleteMainWrp = styled.div`
  position: absolute;
  display: flex;
  width: 6rem;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  gap: 0.5rem;
  padding: 0rem 0.9375rem;
  outline: 1px solid black;
  background: #161a34;
  z-index: 30;
  border-radius: 0.3125rem;
  left: 1.5rem;
  bottom: 1rem;
  cursor: pointer;
`;
export const DeleteTextWpr = styled.p`
  color: white;
  font-family: Inter;
  font-weight: 600;
  font-size: 0.8125rem;
`;
export const SearchIconwpr = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  width: 2.5rem;
  background: #f6f7fb;
  border-radius: 5px;
  justify-content: center;
  flex-shrink: 0;
`;

export const Textwrpr = styled.div`
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

export const Titlewrpr = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 1.0625rem;
  margin-bottom: 0.25rem;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const TitleHeadingWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;
export const ChipText = styled.div`
  padding: 0.2rem 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.65rem;
  color: white;
  background-color: ${({ bgcolor }) => bgcolor};
`;
export const Deswrpr = styled.div`
  font-size: 0.75rem;
  color: #5c5e60;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.24px;
`;

export const Elewrp = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #000000;
  gap: 1rem;
  width: ${(props) => props.width};
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.24px;
  margin-top: 1rem;
  text-transform: capitalize;
`;

export const SharedIconsCont = styled.div`
  display: flex;
  gap: 3px;
  width: 6rem;
  color: #fff;
  margin-top: 1rem;
`;

export const SharedIconCir = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.56rem;
  height: 1.56rem;
  border-radius: 50%;
  background: ${(props) => props.backgroundColor};
  font-style: normal;
  font-weight: 400;
  font-size: 0.6rem;
  flex-shrink: 0;

  &:hover::after {
    content: normal;
    position: absolute;
    bottom: 100%;
    left: 50%;
  }
`;

export const Iconwrpr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
