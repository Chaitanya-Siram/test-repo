import styled from 'styled-components';

export const ButtonWrp = styled.div`
  display: flex;
  width: 100%;
  padding: 0.9375rem 1.375rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
`;

export const ConnectedBtn = styled.div`
  display: flex;
  width: 9.375rem;
  height: 2.625rem;
  padding: 0.75rem 1.125rem;
  justify-content: center;
  align-items: flex-start;
  gap: 0.3125rem;
  border-radius: 0.38956rem;
  background: #675ef2;
  cursor: pointer;
`;

export const ButtonTxt = styled.p`
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;
