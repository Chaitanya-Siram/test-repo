import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FooterLinkMainWrp = styled.div`
  padding: 0.75rem 1.75rem 0.5rem;
  background-color: rgb(236, 239, 243);
  height: 3rem;
  display: flex;
  justify-content: space-between;
`;

export const FooterLinkWrp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  background-color: #eceff3;
`;
// const FooterDivider = styled.div`
//   border: 1px solid ${({ theme }) => theme.text};
//   height: 50%;
// `;
export const FooterLink = styled(Link)`
  text-decoration: none;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.text};
`;
