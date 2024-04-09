import styled from 'styled-components';

export const BackToTopWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: 100%;
  /* background-color: #fff; */
  z-index: 10;
`;

export const BacktoTopTag = styled.div`
  display: ${({ visible }) => (visible ? 'inline' : 'none')};
  width: fit-content;
  height: 1.1rem;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.1rem;
  letter-spacing: -0.01em;
  text-align: left;
  text-decoration: underline;
  color: #0563c1;
  cursor: pointer;
`;
