import styled from 'styled-components';

export const CheckboxGroupContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  /* gap: 1rem; */
  gap: 0.435rem;
  width: fit-content;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
export const Symbol = styled.span`
  color: #e20074;
  margin-right: 0.25rem;
`;

export const HeadLabel = styled.label`
  display: flex;
  flex-direction: row;
  font-size: 0.875rem;
`;

export const Label = styled.p`
  transform: translateY(-0.075em);
  margin: 0 0 0 0.5rem;
  padding: 0;
  user-select: none;

  ${({ labelStyle }) => labelStyle}
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 1rem;
  height: 1rem;
  -webkit-appearance: none;
  appearance: none;

  font: inherit;

  border: ${({ borderWidth, theme }) =>
    borderWidth === '1px'
      ? '1px solid #a1aab3'
      : `${borderWidth} solid #5C5E60`};

  border-radius: 2px;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;

  transition: all 0.3s ease-in-out;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.65em;
    height: 0.65em;

    clip-path: polygon(5% 60%, 40% 85%, 90% 15%, 80% 8%, 37% 69%, 11% 50%);
    background-color: ${({ checkedColor, variant, theme }) =>
      variant === 'filled'
        ? checkedColor || '#fff'
        : checkedColor || theme.main};

    ${({ checkboxStyle }) =>
      checkboxStyle &&
      ` clip-path: ${checkboxStyle.clipPath && checkboxStyle.clipPath};
        width: calc(${checkboxStyle.width} - 20%) ;
        height:calc(${checkboxStyle.height} - 20%) ;
        background-color:"red";
      `}

    ${({ indeterminate }) =>
      indeterminate &&
      'clip-path: polygon(10% 40%, 90% 40%, 90% 60%, 10% 60%); '}

    transform: scale(0) translate(-50%, -50%);
    transition: transform 0.2s ease-in-out;
    transform-origin: bottom left;
  }

  &:checked {
    background-color: ${({ backgroundColor, variant, theme }) =>
      variant === 'outlined' ? '' : backgroundColor || theme.main};
    border: 1px solid ${({ borderColor, theme }) => borderColor || theme.main};

    transition: all 0.3s ease-in-out;
  }

  &:checked::before {
    transform: translate(-50%, -50%) scale(1);
  }

  &:hover {
    border: ${({ borderColor, disabled, checked, theme }) =>
      disabled && !checked
        ? '.96px solid #a1aab3'
        : `.96px solid ${borderColor || theme.main}`};
    opacity: ${({ disabled }) => (disabled ? '1' : '0.8')};
  }

  ${({ checkboxStyle }) =>
    checkboxStyle &&
    `
  width: ${checkboxStyle.width};
  height: ${checkboxStyle.height};
  `}

  @keyframes bounce {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.9);
    }

    100% {
      transform: scale(1);
    }
  }
`;
