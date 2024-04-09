import styled from 'styled-components/macro';

export const NewDashboardwpr = styled.div`
  width: 100%;
  height: 100%;
`;

export const Graphwpr = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

export const Headerwpr = styled.div`
  width: 100%;
  padding: 0rem 1.5rem 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1;
`;

export const Infowpr = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 2.5rem;
`;

export const Titletxtwpr = styled.div`
  font-size: 1.25rem;
  text-transform: uppercase;
  font-weight: 600;
  color: ${({ theme }) => theme.secondaryText};
`;

export const Deswrpr = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.secondaryText};
  font-weight: 400;
`;

export const FooterBoxwpr = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  justify-content: flex-end;
`;

export const AddRemoveChartBtn = styled.div`
  display: flex;
  padding: 0.53rem 0.75rem 0.47rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.primary};
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  height: 2.25rem;
  margin-top: 1px;
  cursor: pointer;
  gap: 0.2rem;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: ${({ theme }) => theme.primary};
`;
