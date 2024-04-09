import styled from 'styled-components';

export const SimpleDropDown = styled.div`
  position: absolute;
  right: 0;
  top: 2rem;
  background: ${({ theme }) => theme.background};
  z-index: 10000;
  border-radius: 0.3125rem;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  border-radius: var(--corner-5-px, 0.3125rem);
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const OptionWrapper = styled.div`
  display: flex;
  gap: 0.56rem;
  align-items: center;
  padding: 0.62rem 1.25rem;
  cursor: pointer;
  justify-content: center;

  //   &:hover {
  //     background: ${({ theme }) => theme.primary};
  //     color: ${({ theme }) => theme.background};
  //   }
`;

export const OptionText = styled.p`
  color: ${({ theme }) => theme.darkText};
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  margin: 0;
  padding: 0;
`;

export const OptionIcon = styled.span`
  display: inline-block;
`;
