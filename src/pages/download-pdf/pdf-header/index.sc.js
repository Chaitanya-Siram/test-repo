import styled from 'styled-components';

export const AppHeaderWrp = styled.div`
  padding: 0.75rem 1.75rem 0.5rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(101, 94, 233);
`;

export const AppHeaderLeft = styled.div``;

export const AppHeaderRight = styled.div`
  display: flex;
  align-items: center;
`;
export const AppLogoSpan = styled.span`
  height: 1.3rem;
  width: 2.5rem;
  background-size: cover;
  background-image: url(${({ theme }) => theme.logo});
`;
