import React from 'react';
import * as Styles from './index.sc';
import PropTypes from 'prop-types';

const Button = ({
  title,
  type = 'button',
  btnStyle,
  backgroundColor,
  color,
  disableStyle,
  borderColor,
  disable,
  icon,
  iconPosition,
  onClick,
  border,
  coachMarkId
}) => {
  // console.log(disable, 'string disabled');
  const theme = {};
  return (
    <Styles.ButtonComp
      theme={theme}
      id={coachMarkId}
      className="button"
      backgroundColor={backgroundColor}
      colorValue={color}
      borderColor={borderColor}
      disableStyle={disableStyle} // disable style
      type={type}
      btnStyle={btnStyle} // this represent style property of the button which some additional style like disable={color,background,border},hoverBg and focusBg useful to give background color for onhover and onfocus.
      iconPosition={iconPosition} // icon position added to specify the position of the icon
      onClick={!disable ? onClick : undefined} // callback event when users clicks on the button. note: will only trigger only if disable property is false or not given.
      disable={disable} // disable property to specify disable state
      border={border} // border
    >
      {icon ? (
        <Styles.IconContainer
          theme={theme}
          //   type={type}
          disable={disable}
          disableStyle={disableStyle}
        >
          {icon}
        </Styles.IconContainer> // icon which can be passed as a react component which should be SVG image only
      ) : (
        ''
      )}

      {title ? <span>{title}</span> : ''}
    </Styles.ButtonComp>
  );
};

export { Button };

Button.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  disable: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  type: PropTypes.string,
  iconPosition: PropTypes.string,
  btnStyle: PropTypes.object,
  disableStyle: PropTypes.object,
  onClick: PropTypes.func,
  border: PropTypes.string,
  coachMarkId: PropTypes.string
};
Button.defaultProps = {
  // props default values
  iconPosition: 'left',
  disable: false,
  backgroundColor: '#585858',
  color: '#ffffff',
  borderColor: '#e20074',
  disableStyle: {
    color: '#D9D9D9',
    background: '#fff',
    border: '1px solid #D9D9D9',
  },
};
