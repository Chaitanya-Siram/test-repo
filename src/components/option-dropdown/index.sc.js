import styled from 'styled-components';

export const Dropdwnwpr = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0px 10px 10px 0px #c3c7d9;
  border-radius: 0px 0px 10px 10px;
  background: #fff;
  transform: translate(0, 3rem);
  cursor: auto;
  z-index: 1;
  padding: 1.5625rem;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const Itemwpr = styled.div`
  width: 100%;
  color: ${({ theme, active }) => (active ? theme.primary : '#585858')};
  font-size: 0.94rem;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  letter-spacing: -0.3px;
  cursor: pointer;
  border-bottom: 0.2px solid #e8e8e8;
  background: #fff;
  padding-bottom: 0.5rem;
`;
