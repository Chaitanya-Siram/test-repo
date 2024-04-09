import React, { useState } from 'react';
import * as Styles from './index.sc';
import PropTypes from 'prop-types';
import RangeSliderInput from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './style.css';

const RangeSlider = ({
  min = 0,
  max = 100,
  value = [0, 100],
  onChange,
  name,
  step = 1,
}) => {
  const [values, setValues] = useState({ min: value[0], max: value[1] });
  return (
    <Styles.RangeSelectorWrapper className="range-slider">
      <RangeSliderInput
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e) => {
          setValues({ min: 0, max: e[1] });
          onChange({ value: [0, e[1]], name });
        }}
        name={name}
      />
      <Styles.MinValue>{values.min}</Styles.MinValue>
      <Styles.MaxValue>{values.max}</Styles.MaxValue>
    </Styles.RangeSelectorWrapper>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.array,
  step: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default RangeSlider;
