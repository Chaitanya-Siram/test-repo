import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  position: relative;
`;

export const Child = styled.div`
  display: flex;
`;

export const TooltipContainer = styled.div`
  position: absolute;
  max-width: 240px;

  width: max-content;
  background-color: ${({ variant }) => (variant === 'dark' ? '#000' : '#fff')};

  background-clip: padding-box;
  border-radius: 0.25rem;
  box-shadow: 0 0.38rem 1rem 0 rgba(0, 0, 0, 0.08),
    0 0.19rem 0.38rem -0.25rem rgba(0, 0, 0, 0.12),
    0 0.56rem 1.75rem 0.5rem rgba(0, 0, 0, 0.05);
  padding: 0.38rem 0.62rem;
  z-index: ${({ zIndex }) => zIndex || 1000};
  transform-origin: center top;
  transition: transform 0.1s ease, opacity 0.1s ease;

  ${({ isOpen }) =>
    isOpen
      ? `  
  transform: scale(1);
    opacity: 1;
       
      `
      : `
      
        transform: scale(0);
    opacity: 0;
     
      `}

  ${({ toolTipStyle }) => toolTipStyle}
`;

export const Content = styled.div`
  color: ${({ variant }) => (variant === 'dark' ? '#fff' : '#000')};
  margin: 0;
  padding: 0;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.0625rem;
  text-align: left;
  word-wrap: break-word;
`;
