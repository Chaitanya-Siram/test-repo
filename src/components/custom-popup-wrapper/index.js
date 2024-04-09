import React from 'react';
import {
  DrawerContentBox,
  FooterBoxWpr,
  HeaderLeftWpr,
  HeaderWrap,
  HeaderTitleWrp,
  IconWpr,
  MainBoxWpr,
} from './index.sc';
import X from '../../assets/icons/X';
import { useSelector } from 'react-redux';
import { theme } from '../../constants/theme';
import Proptypes from 'prop-types';

const CustomPopupWrapper = ({
  heading,
  handleToggle,
  children,
  showClose = false,
  footer,
  width,
  height,
}) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  return (
    <DrawerContentBox width={width}>
      <HeaderWrap>
        <HeaderLeftWpr>
          <HeaderTitleWrp>{heading}</HeaderTitleWrp>
        </HeaderLeftWpr>
        {showClose && (
          <IconWpr onClick={handleToggle}>
            <X color={theme[selectedTheme].primary} size={28} />
          </IconWpr>
        )}
      </HeaderWrap>
      <MainBoxWpr height={height}>{children}</MainBoxWpr>
      {footer && <FooterBoxWpr>{footer}</FooterBoxWpr>}
    </DrawerContentBox>
  );
};

export default CustomPopupWrapper;

CustomPopupWrapper.propTypes = {
  handleToggle: Proptypes.func,
  heading: Proptypes.string,
  children: Proptypes.node,
  footer: Proptypes.node,
  showClose: Proptypes.bool,
  width: Proptypes.string,
  height: Proptypes.string,
};
