import styled from 'styled-components';

export const TabContent = styled.div`
  width: 100%;
  height: calc(100% - 3.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;
export const HeaderSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftSection = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
`;

export const RightSection = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 0.5625rem;
`;

export const UsersText = styled.p`
  color: ${({ theme }) => theme.tabInactive};
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
  margin: 0;
  padding: 0;
`;

export const UserCountWrp = styled.div`
  display: flex;
  padding: 0.375rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.primary};
  background: rgba(103, 94, 242, 0.1);
`;

export const UserCountText = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
  margin: 0;
  padding: 0;
`;

export const Searchwpr = styled.div`
  display: flex;
  padding: 0.8125rem 0.9375rem;
  align-items: flex-start;
  gap: 0.625rem;
  display: flex;
  align-items: center;
  width: 16.8rem;
  height: 2.2rem;
  gap: 1rem;
  border-radius: 0.3125rem;
  border: 1px solid ${({ theme }) => theme.borders};
  background: ${({ theme }) => theme.background};
  padding: 0.56rem 0.55rem;
`;
export const Inputwrpr = styled.input`
  border: none;
  outline: none;
  background: ${({ theme }) => theme.background};
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  width: 100%;
  &::placeholder {
    color: #999999;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 400;
    /* line-height: 1rem; 123.077% */
    letter-spacing: -0.01625rem;
  }
`;
