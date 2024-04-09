import styled from 'styled-components';

export const SentimentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: fit-content;
  span {
    font-size: 0.75rem;
    font-weight: 600;
    color: ${(props) =>
      props.sentiment === 'pos'
        ? '#096841'
        : props.sentiment === 'neg'
        ? '#BF2B2B'
        : '#5F72A2'};
    text-transform: capitalize;
    padding-right: 0.8rem;
  }
  background: ${({ sentiment }) =>
    sentiment === 'pos'
      ? 'linear-gradient( to right, #AEFFDD, #EAFFF6)'
      : sentiment === 'neg'
      ? 'linear-gradient(to right, #FCD2D2, #FFEDED)'
      : 'linear-gradient(to right, #E2EAFF, #F0F4FE)'};
  border-radius: 10px;
`;

export const SentiTextwpr = styled.div`
  color: #999;
  font-size: 0.75rem;
  font-weight: 500;
`;
