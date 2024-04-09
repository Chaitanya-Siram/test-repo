import React, { useEffect, useRef, useState } from 'react';
import { MainWrapper, PopoverWrapper, Toggler } from './index.sc';
import PropTypes from 'prop-types';

function Popover({ content, children, positioningWidth }) {
  const plusButtonRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState();
  const [height, setHeight] = useState();
  const [open, setOpen] = useState(false);
  const mainRef = useRef(null);
  const popoverRef = useRef(null);
  const [popoverWidth, setPopoverWidth] = useState();
  const sideWidths = 250;

  useEffect(() => {
    if (plusButtonRef.current) {
      setButtonWidth(plusButtonRef.current.offsetWidth);
      setHeight(plusButtonRef.current.offsetHeight);
    }
    if (popoverRef.current) {
      setPopoverWidth(popoverRef.current.offsetWidth);
    }
  }, []);

  return (
    <MainWrapper ref={mainRef}>
      <Toggler
        onMouseEnter={() => content && setOpen(true)}
        onMouseLeave={() => content && setOpen(false)}
        ref={plusButtonRef}
      >
        {children}
      </Toggler>
      {content && (
        <PopoverWrapper
          position={
            positioningWidth - popoverWidth - buttonWidth - sideWidths >
            mainRef.current?.offsetLeft
              ? 'right'
              : 'left'
          }
          buttonHeight={height}
          ref={popoverRef}
          show={open}
        >
          {content}
        </PopoverWrapper>
      )}
    </MainWrapper>
  );
}

Popover.propTypes = {
  content: PropTypes.node,
  children: PropTypes.any,
  open: PropTypes.bool,
  toggler: PropTypes.func,
  positioningWidth: PropTypes.any,
};

export default Popover;
