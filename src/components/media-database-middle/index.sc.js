import styled from 'styled-components';

export const MainWrp = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #eceff3;
  padding: 0 1.25rem;
  margin: 1rem 2.5rem 0rem 2.5rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.625rem 0.625rem 0rem 0rem;
`;

export const TextWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ContentWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6875rem;
`;

export const BtnWrp = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MediaText = styled.h3`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.06rem;
  padding: 0;
  margin: 0;
`;

export const JournalistText = styled.h3`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.closeButton};
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem; /* 105.882% */
  letter-spacing: -0.02125rem;
`;

export const CrossButtonWrp = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  gap: 0.5rem;
  border-radius: 0.5rem;
  transform: rotate(180deg);
`;

export const TopBarWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightblue;
  padding: 0.69rem 0.94rem;
  border-radius: 0.438rem;
  border: 1px solid ${({ theme }) => theme.borders};
  background: ${({ theme }) => theme.background};
  width: 100%;
`;

export const SearchBar = styled.input`
  border: none;
  width: 100%;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  ::placeholder {
    color: #555;
    font-size: 0.8125rem;
    font-family: Inter;
    font-weight: 600;
    line-height: 1rem;
    letter-spacing: -0.01625rem;
  }
  :focus {
    outline: none;
  }
`;

export const RightSideWrp = styled.div`
  display: flex;
  gap: 0.635rem;
  align-items: center;
`;
