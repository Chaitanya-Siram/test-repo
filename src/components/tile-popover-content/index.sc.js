import styled from 'styled-components/macro';

export const Contentwpr = styled.div`
  width: 18rem;
  height: 15rem;
  // border: 1px solid #c3c7d9;
  padding: 1.25rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 5px 10px rgba(108, 73, 172, 0.3);
`;

export const Titlewpr = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.secondaryText};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Imgwpr = styled.img`
  height: 100%;
  width: 100%;
`;
