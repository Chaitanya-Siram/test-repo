import styled from 'styled-components';

export const SimpleDropDown = styled.div`
  position: absolute;
  right: 0;
  top: 2rem;
  background: ${({ theme }) => theme.background};
  z-index: 10;
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
  padding: 0.5rem 0.65rem;
  cursor: pointer;
  justify-content: center;
  color: ${({ theme }) => theme.darkText};
  border-bottom: 2px solid ${({ theme }) => theme.shadow};

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    svg > path {
      stroke: ${({ theme }) => theme.background};
    }
  }
`;

export const OptionText = styled.p`
  font-family: Inter;
  font-size: 0.8125rem;
  line-height: 1.125rem;
  font-weight: 400;
  text-align: left;
  margin: 0;
  padding: 0;
`;

export const OptionIcon = styled.span`
  display: inline-block;
`;
