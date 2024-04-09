import styled from 'styled-components';

export const CustomPaginationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

export const PaginationWrapper = styled.div`
  //pagination changes
  display: flex;
  justify-content: space-between;
  /* padding: 0 0.5rem 0 1.5rem;
  width: 100%; */
  /* margin-top: 0.75rem;
  margin-bottom: 0.75rem; */
  margin-right: ${(props) => (props?.assetView ? '1rem' : '')};

  &.m-low {
    margin-top: 0.4rem;
  }
  .page-input {
    display: flex;
    align-items: center;
    border: 1px solid #E2E2E2;
    border-radius: 8px 8px 8px 8px;
    padding: 0.4375rem 0.75rem;
    background: #ffffff;
    box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.12);
    gap:0.5rem;
    .pageTextFaded {
      opacity: 0.5;
      margin-right: 1rem;
      padding: 0.25rem 1rem;
    }
    .pageText {
      padding: 0.25rem 0.5rem;
      background: #ffffff;
    }
    .pagination-current-page {
      text-align: center;
      width: 5rem;
      height: 32px;
      border: 1px solid #cdd3d3;
    }
    .total-pages {
      margin-left: 1rem;
      span {
        margin-right: 0.5rem;
      }
    }
  }
  .MuiTablePagination-displayedRows {
    display: none !important;
  }
  .MuiTablePagination-selectLabel {
    display: none !important;
  }
  .MuiInputBase-root {
    display: none !important;
  }
`;
export const NextButton = styled.button`
  background: #ffffff;
  //   &:hover {
  //     border: ${(props) => !props.disabled && '1px solid black'};
  //   }
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
    padding: 0.375rem 0.5rem;
  cursor: pointer;
  border:none;
  & > div > svg {
    > path {
      stroke: ${(props) => (props.disabled ? 'rgba(0,0,0,0.2)' : '')};
    }
  }
`;
export const PrevButton = styled.button`
  background: #ffffff;
  //   &:hover {
  //     border: ${(props) => !props.disabled && '1px solid black'};
  //   }
  cursor: ${(props) => (props.disabled ? 'none' : 'auto')};
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.5rem;
  cursor: pointer;
  border:none;
  & > div > svg {
    > path {
      stroke: ${(props) => (props.disabled ? 'rgba(0,0,0,0.2)' : '')};
    }
  }
`;

export const NumButton = styled.button`
  background: ${(props) => (props.currpage ? '#EFEBFE;' : '#FFFFFF')};
  color: ${(props) => (props.currpage ? '#5F39F8;' : '#00000')};
  padding: 0.375rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border:none;
  border-radius:8px
  margin: 0px 20px;
  border-radius: 0.375rem;
  cursor: pointer;
`;

export const Showtxt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #585858;
  font-weight: 400;
  font-size: 12px;
  & > span {
    font-size: 12px;
    font-weight: 600;
    margin-left: 0.25rem;
    color: #000000;
  }
`;

export const CustomInputWrp = styled.div`
    display: flex;
    align-items: center;
    margin-left: 2%;
    justify-content: space-between;
    width: 40%;
    padding: 0.2rem;
    background: #ffffff;
    border: 1px solid #E2E2E2;
    box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.12);
    border-radius: 8px;

`;

export const InputBox = styled.input`
    display: flex;
    width: 60%;
    height: 2.2rem;
    align-items: center;
    padding-left: 0.55rem;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.01625rem;
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.darkText};
    border:none;
    border-radius: 0.3125rem;
    outline: none;
    &::placeholder {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 13px;
      color: #999999;
    }
    &:focus {
      outline: none;
    }
`;

export const Iconwpr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  margin-bottom: ${({ rotate }) => (rotate ? '2px' : '0')};
  transform: rotate(${({ rotate }) => rotate}deg);
`;
