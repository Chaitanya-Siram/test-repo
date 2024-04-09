import PropTypes from 'prop-types';
import React from 'react';
import * as Styles from './index.sc';

const ToggleSwitch = ({
  name,
  checked,
  onChange,
  small,
  disabled,
  accentColor,
  offAccentColor,
  disabledColor,
  switchColor,
}) => {
  const theme = {};
  const handleKeyPress = (e) => {
    if (e.keyCode !== 32 || disabled) return;
    e.preventDefault();
    onChange({ name, checked: !checked });
  };

  return (
    <Styles.Container className="switch-container" small={small}>
      <Styles.SwitchWrap
        tabIndex={disabled ? -1 : 1}
        onKeyDown={handleKeyPress}
        small={small}
        checked={checked}
        color={accentColor || theme.main}
        offColor={offAccentColor || '#a1a5b7'}
        disabled={disabled}
        disabledColor={disabledColor || '#d9d9d9'}
        onClick={() => !disabled && onChange({ name, checked: !checked })}
      >
        <Styles.Switch
          small={small}
          checked={checked}
          disabled={disabled}
          switchColor={switchColor}
        />
      </Styles.SwitchWrap>
    </Styles.Container>
  );
};

export default ToggleSwitch;

ToggleSwitch.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  accentColor: PropTypes.string,
  offAccentColor: PropTypes.string,
  disabledColor: PropTypes.string,
  switchColor: PropTypes.string,
};
