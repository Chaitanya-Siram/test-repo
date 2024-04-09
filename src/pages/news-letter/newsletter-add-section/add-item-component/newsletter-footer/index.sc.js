import styled from 'styled-components';

export const FooterContainerWrp = styled.div`
  width: 100%;
  padding: 1.25rem, 0, 0, 0;
  gap: 0.625rem;
  display: flex;
  flex-direction: column;
`;

export const FooterContentWrp = styled.textarea`
  font-family: Inter;
  font-style: italic;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.01em;
  text-align: left;
  color: #7c7c7c;
  width: 100%;
  border: none;
  outline: none;
  resize: none;
`;

export const FooterUnSubWrp = styled.div`
  font-family: Inter;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.01em;
  text-align: left;
  color: #7c7c7c;
  width: fit-content;
  height: 1.25rem;
`;
