import styled from 'styled-components';

export const LeftbarWrp = styled.div`
  width: 15rem;
  border-radius: 0.625rem;
  color: ${({ theme }) => theme.secondaryText};
  padding: 0.35rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.62rem;
`;

export const ItemWrp = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 0px 0px #eceff3;
  &.active {
    box-shadow: 0px 2px 0px 0px ${({ theme }) => theme.primary};
  }
  width: 100%;
  display: flex;
  padding: 1rem 0rem;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;

  &:hover > div {
    color: ${({ theme }) => theme.primary};
  }
`;

export const LeftbarItem = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
  /* transition: all 400ms ease-in-out; */
  &.active {
    color: ${({ theme }) => theme.primary};
  }
  width: 100%;
  margin: 0;
  padding: 0;
`;
