import styled from 'styled-components';

export const MainWrp = styled.div`
  width: 100%;
  border-radius: 0rem 0rem 0.625rem 0.625rem;
  /* border-top: 2px solid #eceff3; */
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
  padding: 1.3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const TopBarWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background-color: lightblue;
  padding: 0.6875rem 0.9375rem;
  border-radius: 0.438rem;
  border: 1px solid var(--others-light, #c3c7d9);
  background: #fff;
`;

export const SearchBar = styled.input`
  border: none;
  width: 100%;
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

export const BottomBarWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  /* justify-content: space-between; */
`;
export const SearchWrp = styled.div`
  width: 100%;
  height: 2.375rem;
  border-radius: 0.438rem;
  border: 1px solid #dedede;
  background: #fff;
  padding: 0.6875rem 0.9375rem 0.6875rem 0.9375rem;
  display: flex;
  align-items: center;
`;

export const SearchInputsWrp = styled.div`
  /* width: calc(100% / 5); */
  flex: 1;
  height: 2.375rem;
  border-radius: 0.438rem;
  border: 1px solid #dedede;
  background: #fff;
  padding: 0.6875rem 0.9375rem 0.6875rem 0.9375rem;
  display: flex;
  align-items: center;
`;

export const SearchInputs = styled.input`
  border: none;
  width: 100%;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  flex: 1;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  color: ${({ theme }) => theme.darkText};
  ::placeholder {
    color: #999999;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: -0.01625rem;
  }

  :focus {
    outline: none;
  }
`;
