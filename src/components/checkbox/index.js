import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './index.sc';
// import { useTheme } from 'themes';

// Define a Checkbox component with props and default values
const Checkbox = ({
  variant,
  backgroundColor,
  borderColor,
  checkedColor,
  onChange,
  checkboxStyle,
  checked,
  borderWidth,
}) => {
  const theme = {};
  return (
    <Styles.CheckboxContainer>
      <Styles.Checkbox
        theme={theme}
        variant={variant}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        checkedColor={checkedColor}
        checkboxStyle={checkboxStyle}
        // disabled={option.disabled}
        onChange={onChange}
        checked={checked}
        borderWidth={borderWidth}
      />
    </Styles.CheckboxContainer>
  );
};

// Define prop types for Checkbox component
Checkbox.propTypes = {
  variant: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  checkedColor: PropTypes.string,
  onChange: PropTypes.func,
  checkboxStyle: PropTypes.object,
  checked: PropTypes.bool,
  borderWidth: PropTypes.string,
};

Checkbox.defaultProps = {
  variant: 'filled',
  checked: false,
  borderWidth: '1px',
};

// Export Checkbox component as default
export default Checkbox;
