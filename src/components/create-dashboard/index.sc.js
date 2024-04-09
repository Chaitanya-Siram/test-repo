import styled from 'styled-components';

export const SearchPopwrpr = styled.div`
  width: 100%;
  padding: ${(props) =>
    props.isNewsletter ? '0.625rem 1rem' : '1rem 0 0.65rem'};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.secondaryBackground};
  max-height: 90vh;
`;

export const SearchHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  height: 3.5rem;
  position: relative;
`;

export const MainTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MainTitlewrpr = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.secondaryText};
  min-width: fit-content;
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
  font-weight: 600;
  margin-left: 0.25rem;
  font-size: 13px;
  display: flex;
  width: 100%;
  &:focus {
    background: ${({ theme }) => theme.secondaryBackground};
  }
  &::placeholder {
    font-weight: 600;
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
  margin: 0.25rem;
  flex-shrink: 0;
  &:checked {
    width: 1rem;
    height: 1rem;
    accent-color: #675ef2;
    border-radius: 3px;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  box-sizing: border-box;
  background: rgba(211, 214, 223, 0.2);
  width: 100%;
  height: 1.75rem;
  align-items: center;
  padding: 0 1.25rem;
  flex-shrink: 0;
  ${(props) =>
    props.isNewsletter &&
    `padding: 0 3rem;
  `}
  justify-content: space-between;
`;

export const Framrightpr = styled.div`
  display: flex;
  min-width: 10rem;
  gap: 2rem;
`;

export const Framleftpr = styled.div`
  display: flex;
  gap: 0.8rem;
`;
export const FramRightpr = styled.div`
  display: flex;
  width: ${(props) => (props.isPopup ? '69%' : '65%')};
  justify-content: space-between;
  width: ${(props) => props.width};
`;

export const Framewrpr = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: ${(props) => (props.isNewsletter ? '5rem' : '6rem')};
  gap: 5px;
  // margin-right: ${(props) => props.marginRight};
  width: ${(props) => props.width};
`;

export const Frametxt = styled.div`
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 0.7rem;
  color: #5c5e60;
  min-width: fit-content;
`;

export const ContentsContainer = styled.div`
  width: 100%;
  height: 70vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0.5rem 0;
  padding-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
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
  border-bottom: 1px solid #c3c7d9;
  padding: 0 1.25rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 5.5rem;
  flex-shrink: 0;
  min-height: fit-content;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.secondaryBackground};
`;

export const MainBox = styled.div`
  display: flex;
  width: 30%;
  gap: 0.75rem;
  align-items: center;
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
`;

export const Titlewrpr = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 0.25rem;
`;

export const Deswrpr = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 0.7rem;
  color: #5c5e60;
`;

export const Elewrp = styled.div`
  display: flex;
  align-items: center;
  width: 6rem;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.secondaryText};
  width: ${(props) => props.width};
`;

export const SharedIconsCont = styled.div`
  display: flex;
  gap: 3px;
  /* width 6rem; */
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
`;

export const Iconwrpr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// new
export const MainBoxwrp = styled.div`
  height: 31.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.25rem;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const FooterBoxwpr = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.85rem 1rem;
  margin-top: ${({ mt }) => `${mt}rem`};
`;

export const LeftfootBoxwpr = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: flex-end;
  color: #999999;
  & span {
    font-weight: 600;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.secondaryText};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ButtonBoxwpr = styled.button`
  display: flex;
  padding: 0.625rem 0.93rem;
  background: ${(props) => props.background};
  border-radius: 10px;
  border: none;
  margin: 0;
  height: 2.25rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.81rem;
  color: ${({ fontColor }) => fontColor};
  cursor: pointer;
  :disabled {
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.disabledBtnBackground};
  }
  &.btn {
    border-radius: 0.5rem;
  }
  &.cancel {
    border: 1px solid #535770;
  }
`;
export const CarouselDotbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem;
  gap: 0.1875rem;
`;

export const Dots = styled.span`
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  aspect-ratio: 1/1;
`;
