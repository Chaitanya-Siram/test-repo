import styled from 'styled-components';

export const MainSectionWrp = styled.div`
  width: calc(100% - 15rem);
  height: 100%;
  border-left: 1px solid #c3c7d9;
  border-right: 1px solid #c3c7d9;
  color: ${({ theme }) => theme.secondaryText};
  padding: 0.7rem 1.34rem;
`;
