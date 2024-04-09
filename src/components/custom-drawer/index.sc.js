import styled from 'styled-components';
export const DrawerContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.75rem;
  max-height: 90vh;
  background-color: rgb(236, 239, 243);
`;

export const Headerwrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: ${({ addArticle }) => (addArticle ? '0 0 1rem 0' : '1rem 1.875rem')};
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: relative;
  border-radius: 0.625rem 0.625rem 0 0;
`;

export const Headerleftwpr = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  & > img {
    width: 1.5rem;
    height: 1.5rem;
    align-items: center;
  }
`;

export const Heaerlblwrp = styled.div`
font-family: Inter;
font-size: 24px;
font-weight: 600;
line-height: 29px;
letter-spacing: -0.02em;
text-align: left;
color: #000000;

`;

export const MainBoxwpr = styled.div`
  height: 31.25rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  background: rgb(236, 239, 243);
  padding: 1.75rem;
`;

export const FooterBoxwpr = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.85rem;
  margin-top: ${({ mt }) => `${mt}rem`};
  background: #ffffff;
  border-radius: 0 0 0.625rem 0.625rem;
  /* box-shadow: rgb(195, 199, 217) 0px -1px 0px 0px; */
  z-index: 10;
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
  &:hover {
    cursor: pointer;
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
  background: ${({ background, disabled }) =>
    disabled ? '#C3C7D9' : background};
  border-radius: 5px;
  border: none;
  margin: 0;
  height: 2.25rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.81rem;
  color: ${({ fontColor }) => fontColor};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &.btn {
    border-radius: 5px;
  }
  &.cancel {
    border: 1px solid #535770;
  }
`;

export const Iconwpr = styled.div`
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  & > img {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export const PoptabTitle = styled.div`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.6rem 0.25rem;
`;

export const TabsBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

export const HeadingBoxwpr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  & > span {
    font-weight: 400;
    font-size: 0.7rem;
    color: #818181;
  }
  & .yshj {
    font-weight: 600;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.secondaryText};
    & > span {
      font-weight: 400;
      font-size: 0.7rem;
      color: #818181;
      margin-left: 3px;
    }
  }
  padding: 1rem;
  background: #ffffff;
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
`;

export const Headingwpr = styled.div`
  display: flex;
  background: rgba(195, 200, 220, 0.2);
  font-weight: 600;
  font-size: 1rem;
  width: 100%;
  padding: 0.7rem 0.75rem;
  color: ${({ theme }) => theme.secondaryText};
  border-radius: 5px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
`;

export const ItemLabelwpr = styled.div`
  font-weight: 600;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.secondaryText};
`;

export const ItemDeswpr = styled.div`
  font-weight: 400;
  font-size: 0.6rem;
  color: #999999;
`;

export const TransBtnbox = styled.div`
  /* position: absolute; */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: ${(props) => (props.isList ? '0.7rem' : '0.55rem')} 1rem;
  background: ${({ theme }) => theme.primary};
  /* border: 1px solid ${({ theme }) => theme.background}; */
  border-radius: 5px;
  /* bottom: ${(props) => (props.isList ? '0.1rem' : '0rem')}; */
  /* right: 0; */
  /* transform: translate(-2rem, calc(100% + 1.5rem)); */
  cursor: pointer;
  z-index: 2;
`;

export const TransBtntxt = styled.p`
  font-weight: 600;
  font-size: 0.75rem;
  /* text-transform: uppercase; */
  text-align: center;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
  color: #ffffff;
`;

export const ListBoxwpr = styled.div`
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SortInfotxt = styled.div`
  font-size: 0.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.secondaryText};
  margin: 0.25rem;
`;

export const ListContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border: 1px solid #c3c7d9;
  width: 100%;
  border-radius: 0.62rem;
`;

export const ListLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ListDiscwpr = styled.div`
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  font-size: 0.7rem;
  margin-right: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const WriteIconwpr = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;
