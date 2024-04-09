import styled from 'styled-components';

export const TextContentWrp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme }) => theme.background};
  padding: 0.75rem 1.25rem;
  gap: 0.25rem;
`;

export const TextHeading = styled.span`
  color: #000;
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem; /* 121.739% */
  letter-spacing: -0.02875rem;
`;

export const TextContent = styled.p`
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem;
  letter-spacing: -0.00938rem;
  margin: 0;
  padding: 0;
`;

export const NewsLetterTextItemInput = styled.textarea`
  color: #000;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem; /* 121.739% */
  letter-spacing: -0.02875rem;
  width: 100%;
  resize: none;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  overflow: hidden;
  &::placeholder {
    color: ${({ theme }) => theme.greyColor || 'black'};
  }
`;
export const NewsLetterTextItemdescription = styled.textarea`
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem;
  letter-spacing: -0.00938rem;
  resize: none;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  padding-top: 0.5rem;
  &::placeholder {
    color: ${({ theme }) => theme.greyColor || 'black'};
  }
`;
