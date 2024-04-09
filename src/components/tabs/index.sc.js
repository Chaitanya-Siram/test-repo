import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // width: 100%;
  overflow: hidden;
  justify-content: center;
`;
export const TabsWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: ${(props) => props.paddingWrapper};
  padding-bottom: 0;
  border-width: ${(props) => props.wraperBorderWidth};
  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;

    z-index: 999;
  }
  ::before {
    left: 0;
    /* box-shadow: inset 10.08px 0 8px -8px rgba(0, 0, 0, 0.08); */

    opacity: ${({ showLeftShadow }) => (showLeftShadow ? 1 : 0)};
  }
  ::after {
    right: 0;
    /* box-shadow: inset -10.08px 0 8px -8px rgba(0, 0, 0, 0.08); */

    opacity: ${({ showRightShadow }) => (showRightShadow ? 1 : 0)};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  white-space: nowrap;
  width: 100%;
  gap: ${({ gapitems }) => gapitems};
  position: relative;
  bottom: -0.96px;
  overflow-x: auto;

  z-index: 1;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabContainer = styled.div`
  position: relative;
  display: inline-block;
  font-family: Inter;
  user-select: none;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.26px;
  text-transform: capitalize;
  box-sizing: border-box;
  word-wrap: nowrap;
  cursor: pointer;

  justify-content: center;
  min-width: ${(props) => props.width || 'fit-content'};

  ${({
    variant,
    active,
    activeColor,
    inactiveColor,
    theme,
    bottomBorderWidth,
    inactiveCardBGColor,
    activeCardBGColor,
    cardBorderRadius,
    inactiveFontWeight,
    activeTab,
  }) =>
    getVariantStyles(
      variant,
      active,
      activeColor,
      inactiveColor,
      theme,
      bottomBorderWidth,
      activeCardBGColor,
      inactiveCardBGColor,
      cardBorderRadius,
      inactiveFontWeight
    )}
  ${({ isDisabled }) =>
    isDisabled && {
      cursor: 'not-allowed ',

      opacity: '0.5',
    }};
  transition: all 0.2s ease;
`;

const getVariantStyles = (
  variant,
  active,
  activeColor,
  inactiveColor,
  theme,
  bottomBorderWidth,
  activeCardBGColor,
  inactiveCardBGColor,
  cardBorderRadius,
  inactiveFontWeight
) => {
  switch (variant) {
    case 'card':
      return `
          border: none;
          padding: 0;
          border-radius: ${cardBorderRadius};
          & >div{
            min-height: 2rem;
          }
          & >div >div{
            background-color: ${
              active ? activeCardBGColor : inactiveCardBGColor
            };
            color: ${active ? activeColor || theme.main : inactiveColor};
            padding: 0.2rem 0.625rem
          }
          color: ${
            active ? activeColor || theme.main : inactiveColor || theme.primary
          };
        `;
    case 'underline':
      return `border-bottom: ${
        active ? bottomBorderWidth : bottomBorderWidth
      } solid ${active ? activeColor || theme.main : 'transparent'};
      color: ${
        active ? activeColor || theme.main : inactiveColor || theme.darkText
      };
      font-weight: ${active ? '600' : inactiveFontWeight || '400'}
    `;
    default:
      return `
          border-bottom: .96px solid ${
            active ? activeColor || theme.main : inactiveColor || theme.darkText
          };
          padding-bottom: .69rem;
          color: ${
            active ? activeColor || theme.main : inactiveColor || theme.darkText
          };
        `;
  }
};

export const Title = styled.div`
  font-family: Inter;
  position: relative;
  text-transform: capitalize;
  tagTitleP {
    margin: 0;
  }
  tagTitleSpan {
    display: none;
  }
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const HorizontalLine = styled.div`
  content: '';
  width: 100%;
  height: 0.96px;
  background-color: #d9d9d9;
  z-index: 0;
`;
export const Ellipsis = styled.div`
  position: absolute;
  right: -43.04px;
  height: calc(100% - 0.06rem);
  bottom: 0;
  width: 2.38rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 3.04px;
  cursor: pointer;
  user-select: none;
  ${({ variant }) =>
    variant === 'card' && {
      backgroundColor: '#F2F6FA',
      border: '.96px solid #d9d9d9',
      borderBottom: 'none',
      borderRadius: ' 4px 4px 0px 0px',
    }}

  &::after {
    content: '';
    width: 100%;
    height: 40px;
    position: absolute;
    top: 100%;
  }

  &:hover {
    color: ${({ theme }) => theme.main || '#e20074'};
  }
`;

export const TabContent = styled.div`
  padding: 0.75rem;
  background-color: #fff;

  ${({ variant }) =>
    variant !== 'underline' &&
    ` border: .96px solid #d9d9d9;
    border-top: none;

    `}
  ${({ variant }) =>
    variant === 'underline' &&
    `
  background-color: transparent;
  padding: .75rem 0;
  `}
`;

export const MenuItem = styled.div`
  width: 100%;
  cursor: pointer;
  ${({ active, activeColor, inactiveColor, theme }) =>
    active
      ? `color: ${activeColor || theme.main}`
      : `color: ${inactiveColor || theme.contrastText}`};

  &:hover {
    color: ${({ theme }) => '' || '#e20074'};
  }
`;
