import styled from 'styled-components';

export const NewsPagewpr = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

export const Newsltrwpr = styled.div`
  width: calc(100% - 4rem);
  margin: auto;
  height: calc(100vh - 4.5rem);
  cursor: default;
  padding-top: 1rem;
  position: relative;
`;
export const Inputwrpr = styled.input`
  border: none;
  outline: none;
  padding: 1rem;
  background: ${({ theme }) => theme.secondaryBackground};
  font-weight: 500;
  margin-left: 0.25rem;
  font-size: 13px;
  display: flex;
  width: 100%;
  &:focus {
    background: ${({ theme }) => theme.secondaryBackground};
  }
  &::placeholder {
    font-weight: 500;
    font-size: 0.8125rem;
    color: #999999;
    display: flex;
    align-items: flex-end;
  }
`;
export const Searchwpr = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${(props) =>
    !props.isNewsletter &&
    `box-sizing: border-box;
  gap: 1rem;
  height: 3rem;
  border: 1px solid #c3c7d9;
  border-width: 1px 0;
  `}
`;
export const Labelwrpr = styled.label`
  width: 100%;
  display: flex;
  padding: 0rem 1rem;
  gap: 0.5rem;
  flex-direction: ${(props) => props.isNewsletter && 'row-reverse'};
  align-items: center;
  background: ${({ theme }) => theme.secondaryBackground};
  cursor: pointer;
  ${(props) =>
    props.isNewsletter &&
    `
  border-radius: 10px;
  border: 1px solid #c3c7d9;
  background: #fff;
  height: 2.5rem;
  box-sizing: border-box;`}
`;
export const NewsltrHeader = styled.div`
  width: 100%;
  background: #fff;
  padding: 1.25rem 1rem;
  height: 4.25rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: row;
  gap: 0.6875rem;
  border-radius: 0.625rem;
  margin-bottom: 0.75rem;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
`;
export const TopWrapper = styled.div`
  background: #fff;
  border-radius: 0.625rem 0.625rem 0 0;
`;

export const NewsLetterButton = styled.div`
  display: flex;
  padding: 0.5rem 0.8125rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-8676-ff, #675ef2);
  background: ${({ theme }) => theme.primary};
  margin-right: 0.5rem;
  cursor: pointer;
  &:hover {
    transition: background 0.2s ease;
    background: #857ef5;
    color: #fff;
  }

  &:active {
    background: #524bc2;
  }
`;
export const ButtonText = styled.div`
  color: ${({ theme }) => theme.background};
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0rem;
`;
export const HeaderRightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CrossButtonWrp = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: #fff;
  transform: rotate(180deg);
`;

export const HeaderTitlewpr = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.secondaryText};
  font-weight: 600;
`;
