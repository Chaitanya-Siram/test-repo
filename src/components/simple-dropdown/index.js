import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  OptionIcon,
  OptionText,
  OptionWrapper,
  SimpleDropDown,
} from './index.sc';

const SimpleReusableDropDown = ({
  options,
  isOpen,
  graphDownloading = false,
  setIsOpen,
}) => {
  useEffect(() => {
    if (!graphDownloading && setIsOpen) setIsOpen(false);
  }, [graphDownloading, setIsOpen]);
  return (
    <SimpleDropDown isOpen={isOpen}>
      {options.map((option, index) => (
        <OptionWrapper
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
            option.clickFunction(option);
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

SimpleReusableDropDown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      clickFunction: PropTypes.func,
    })
  ),
  isOpen: PropTypes.bool.isRequired,
  graphDownloading: PropTypes.func,
  setIsOpen: PropTypes.func,
};

export default SimpleReusableDropDown;
