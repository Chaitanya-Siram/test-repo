import styled from 'styled-components';
import { load8Keyframes } from '../../assets/icons/loading/circularLoading.sc';

export const Tile = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  position: relative;
`;

export const LoadingWrapper = styled.div`
  height: 0.7rem;
  line-height: 1.25rem;
  font-size: 0.7rem;
  letter-spacing: -0.016rem;
  margin-left: 0.7rem;
`;

export const Loader = styled.div`
  border-radius: 50%;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 0;
  font-size: ${({ size }) => size};
  position: relative;
  text-indent: -9999em;
  border-top: ${({ theme, bgColor }) =>
    `1.1em solid ${bgColor || theme.primary}33`};
  border-right: ${({ theme, bgColor }) =>
    `1.1em solid ${bgColor || theme.primary}33`};
  border-bottom: ${({ theme, bgColor }) =>
    `1.1em solid ${bgColor || theme.primary}33`};
  border-left: ${({ theme, bgColor }) =>
    `1.1em solid ${bgColor || theme.primary}`};
  transform: translateZ(0);
  animation: ${load8Keyframes} 1.1s infinite linear;
`;

export const TileTitle = styled.div`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.text};
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.016rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 45%;
`;

export const TileDataWrp = styled.div`
  margin: 0;
  padding: 0;
  font-style: normal;
  font-size: 1.375rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #000000;
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: -0.028rem;
  gap: 0.2rem;
  width: 100%;
`;

export const TileData = styled.p`
  color: #000;
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: -0.028rem;
  margin: 0;
`;

export const Change = styled.div`
  display: flex;
  align-items: center;
  /* gap: 0.625rem; */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 0.813rem;
  color: ${(props) => (props.isIncreased ? '#00B929' : '#FF2525')};
  padding: ${(props) => (props.isToolTip ? '0rem' : '0.25rem')};
  font-size: 0.813rem;
  line-height: 1rem;
  letter-spacing: -0.016rem;
  margin: 0;
`;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  z-index: 0;
`;
// tooltip
export const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.background};
  padding: 0.7rem 0.875rem;
`;
export const TooltipTitle = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 0.5rem;
  color: #585858;
  text-transform: capitalize;
`;
export const TooltipValue = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 0.75rem;
  color: #000000;
`;

export const ChangeWrp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ChangeTxt = styled.div`
  color: ${(theme) => theme.graphAxisColor};
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 1rem;
  width: 12rem;
`;
