import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainWrp = styled.div`
  padding: 0.625rem 0.625rem 0.625rem 0.625rem;
  background: ${(props) =>
    props.isOpen ? 'rgba(160, 167, 198, 0.6)' : 'transparent'};
  width: 100vw;
  height: 100vh;
  position: absolute;
  transition: 0.3s ease-in-out;
  z-index: 500;
  top: 0;
  left: 0;
`;

export const PopupWrp = styled.div`
  position: absolute;
  top: 0;
  right: ${(props) => (props.isOpen ? '0' : '-100rem')};
  background-color: #fff;
  width: 28.125rem;
  transition: 0.3s ease-in-out;
  z-index: 1000;
  height: ${(props) => (props.isAlert ? '100vh)' : 'calc(100% - 1.25rem)')};
  margin: 0.625rem;
  border-radius: 0.625rem;
  overflow: hidden;
`;

export const HeaderWrp = styled.div`
  display: flex;
  width: 100%;
  height: 6.125rem;
  padding: 2.5625rem 1.875rem 1rem 1.875rem;
  align-items: center;
  gap: 0.625rem;
  background-color: ${({ theme }) => theme.primary};
  position: relative;
  border-radius: 0.625rem 0.625rem 0 0;
`;

export const HeaderText = styled.h2`
  color: ${({ theme }) => theme.background};
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5625rem; /* 125% */
  letter-spacing: -0.025rem;
  margin: 0;
  padding: 0;
`;

export const NotificationCountWrp = styled.div`
  display: flex;
  padding: 0.3125rem 0.5rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.3125rem;
  background: ${({ theme }) => theme.background};
`;

export const CountText = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
  margin: 0;
  padding: 0;
`;

export const NotificationCloseIconWrp = styled.div`
  position: absolute;
  right: 1.56rem;
  top: 0.94rem;
  cursor: pointer;
`;

export const NotificationSettingIconWrp = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 3.09rem;
  cursor: pointer;
`;

export const ContentWrp = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: calc(100vh - 6.25rem);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 1rem;
`;

export const DayText = styled.p`
  color: ${({ theme }) => theme.text};

  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
`;

export const NotificationWrp = styled.div`
  display: flex;
  width: calc(100% - 2rem);
  padding: 1.25rem 0rem 0rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;

export const DayTextWrp = styled.div`
  width: 100%;
  background: rgba(236, 239, 245, 0.5);
  height: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1.25rem;
`;
export const LinkWrp = styled(Link)`
  text-decoration: none;
`;
