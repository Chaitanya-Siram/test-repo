import styled from 'styled-components';

export const MainWrp = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  border-bottom: 1px solid lightgrey;
`;
export const UserMainWrp = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ImgWrp = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;
export const UserDetailsWrp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 0.25rem;
  &:hover {
    cursor: pointer;
  }
`;

export const TextWrp = styled.p`
  font-size: ${({ bold }) => (bold ? '0.8125rem' : '0.75rem')};
  font-weight: ${({ bold }) => (bold ? '700' : '500')};
  color: ${({ bold }) => (bold ? '#161A34' : '#656B8A')};
  margin: 0;
  padding: 0;
`;
export const ButtonMainWrp = styled.div`
  padding: 1rem 0rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
export const ButtonWrp = styled.button`
  width: fit-content;
  min-height: 2.625rem;
  font-weight: 600;
  font-family: Inter;
  font-size: 0.9375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
  padding: 0.55rem 0.8125rem;
  -webkit-box-align: center;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.secondaryText};
  background: var(--grey-white, #fff);
  cursor: pointer;
  color: ${({ theme }) => theme.secondaryText};

  > svg > g > g > path {
    fill: ${({ theme }) => theme.secondaryText};
  }
  &:hover {
    transition: background 0.2s ease 0s;
    background: #857ef5;
    color: #fff;
    border: 1px solid ${({ theme }) => theme.primary};
  }

  &:hover > svg > g > g > path {
    fill: #fff;
  }
`;
