import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export const ArticleWrp = styled.div`
  height: ${({ full }) => (full ? '45%' : '100%')};
  display: flex;
  flex-direction: column;
`;
export const MainArticleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  justify-content: space-between;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`;

export const HeaderWrp = styled.div`
  display: flex;
  height: 2rem;
  justify-content: space-between;
  align-items: center;
`;

export const TimeText = styled.div`
  padding: 0 0 0.4rem;
  font-size: 0.6875rem;
  color: #585858;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const DescriptWrp = styled.div`
  width: 100%;
  word-break: normal;
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 600;
  padding: 1.1rem 0;
  color: #000;
  color: ${({ show, theme }) => (show ? theme.primary : '#000000')};
`;
export const FooterTag = styled.div`
  padding: 0.5rem 0;
  font-size: 0.7rem;
  font-weight: 400;
  color: gray;
`;

export const ImageWrp = styled.div`
  height: ${(props) => (props.full ? '55%' : 'calc(50% - 0.5rem/2)')};
  width: ${(props) => (props.full ? 'calc(100% + 2.5rem)' : '18.75rem')};
  background-image: ${({ src }) => `url(${src})`};
  margin-left: -1.25rem;
  background-size: cover;
  background-position: center;
  transition: transform 400ms ease-in;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ArticleLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  justify-content: space-between;
  margin: 0;
`;

export const Popoverwpr = styled.div`
  box-sizing: border-box;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 8px 8px rgba(153, 153, 153, 0.3);
  border-radius: 6px;
  padding: 0.75rem;
  bottom: -4.25rem;
  right: 0px;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  gap: 0.5rem;
  cursor: pointer;
  flex-direction: column;
  width: 10rem;
  transition: all 0.3s ease-in;
  cursor: auto;
`;

export const PopItem = styled.div`
  width: 100%;
  font-weight: 400;
  cursor: pointer;
  font-size: 0.8125rem;
  color: #000000;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const UpperRight = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: space-between;
  opacity: ${(show) => (show ? '1' : '0')};
  animation: ${fadeIn} 0.6s ease-in-out;
  margin-top: -0.5rem;
`;

export const CircleIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  justify-content: flex-start;
  border-radius: 40px;
  background: #ffffff;
  gap: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
`;

export const Hoverwpr = styled(Link)`
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.75rem;
  color: #000000;
`;
export const Iconwpr = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;
