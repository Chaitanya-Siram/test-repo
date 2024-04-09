import styled from 'styled-components';

export const Titlewpr = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.secondaryText};
`;

export const ButtonBoxwpr = styled.div`
  display: flex;
  padding: 0.625rem 0.93rem;
  background: ${({ background }) => background};
  border-radius: 6px;
  height: 2.4rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.75rem;
  color: ${({ fontColor }) => fontColor};
  cursor: pointer;
  &.cancel {
    border: 1px solid #535770;
  }
`;
