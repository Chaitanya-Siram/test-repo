import styled from 'styled-components';

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.56rem;
  height: 1.56rem;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
  color: #ffffff;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.2px;
`;
