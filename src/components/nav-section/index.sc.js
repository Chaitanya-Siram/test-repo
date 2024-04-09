import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavWrp = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  gap: 0.688rem;
`;

const navColors = ['#FF86A0', '#3DB7FB', '#5FCDD6', '#8B90A9'];

export const Link = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  /* width: 13.75rem; */
  flex: 1;
  // background-color: ${({ index }) => navColors[index % navColors.length]};
  background-color: ${({ theme }) => theme.background};
  border-radius: 1rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 1.25rem;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  ${({ role }) =>
    role === 'Analyst' ? 'display: none;' : 'opacity: 1;'}/* &.active {
    background-color: red;
  } */
`;

export const PlusButton = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  width: 12.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0.938rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.18rem;
  box-sizing: border-box;
  height: ${(props) => (props.isFull ? '100%' : '50%')};
  font-weight: 200;
  font-size: 2rem;
`;
/* @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
  } */

export const LastLinks = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SaveCount = styled.div`
  width: 2.14rem;
  height: 1.6rem;
  border-radius: 1.572rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.logoText};
`;
export const TileHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const TileLabel = styled.div`
  color: ${({ theme }) => theme.text};
  word-wrap: break-word;
  font-size: 0.9375rem;
  width: 8rem;
  padding-top: 0.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #161a34;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.3px;
`;
export const TileValue = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  padding-right: 0.5rem;
  color: ${({ alert, theme }) => (alert === true ? 'red' : theme.primary)};
`;

export const TileBottomwpr = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: start;
  gap: 0.2rem;
`;

export const MainWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  transition: background-color 0.5s ease;
  background-color: ${({ active }) => (active ? '#e4e9f7' : '')};
`;

export const OuterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  z-index: -1;
`;

export const InnerWrapper = styled.div`
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color 0.5s ease;
  background-color: ${({ active }) => (active ? '#675EF2 ' : '')};
`;

export const BottomWrapper = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10%;
  right: 10%;
  display: flex;
`;

export const SavedContainer = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  height: 2rem;
`;
export const IconText = styled.div`
  font-size: 0.825rem;
  font-weight: bold;
  line-height: 1.25rem;
  color: ${({ alert, theme }) => (alert === true ? 'red' : theme.primary)};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ButtonBoxwpr = styled.div`
  display: flex;
  padding: 0.625rem 0.93rem;
  background: ${({ background, disabled }) =>
    disabled ? '#C3C7D9' : background};
  border-radius: 6px;
  height: 2.4rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.75rem;
  color: ${({ fontColor }) => fontColor};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: ${({ border }) => border};
`;
