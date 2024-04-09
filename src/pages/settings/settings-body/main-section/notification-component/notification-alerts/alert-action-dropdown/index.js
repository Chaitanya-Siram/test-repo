import React from 'react';
import PropTypes from 'prop-types';
import {
  OptionIcon,
  OptionText,
  OptionWrapper,
  SimpleDropDown,
} from './index.sc';

const AlertActionDropDown = ({ options, isOpen }) => {
  return (
    <SimpleDropDown isOpen={isOpen}>
      {options.map((option, index) => (
        <OptionWrapper
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            option.clickFunction();
          }}
        >
          <>
            {option.icon && <OptionIcon>{option.icon}</OptionIcon>}
            <OptionText>{option.label}</OptionText>
          </>
        </OptionWrapper>
      ))}
    </SimpleDropDown>
  );
};

AlertActionDropDown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      clickFunction: PropTypes.func,
    })
  ),
  isOpen: PropTypes.bool.isRequired,
};

export default AlertActionDropDown;
