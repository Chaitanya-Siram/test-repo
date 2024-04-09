import React, { useEffect, useRef, useState } from 'react';
import { PopupBackWrapper, PopupContainer, XCircle } from './index.sc';
import PropTypes from 'prop-types';
import X from '../../assets/icons/X';

const DashboardPopup = ({
  popContent = <></>,
  open = true,
  toggler = () => {},
  padding = '1.5rem 1.5rem',
  Cross = false,
  borderRadius = '1.25rem',
  isPopup = false,
  width,
  setSelectedPath = () => {},
}) => {
  const popupRef = useRef();
  const [newOpen, setNewOpen] = useState(false);
  const [close, setClose] = useState(false);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      toggler(!open);
      setNewOpen(false);
      setSelectedPath('');
    }
    document.removeEventListener('click', handleDocumentClick);
  };

  const handleDocumentClick = (event) => {
    handleClickOutside(event);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!open) {
        setClose(false);
      }
    }, 200);
    return () => {
      if (!isPopup) clearTimeout(timeoutId);
      else setClose(false);
    };
  }, [open, isPopup]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (open) {
        setNewOpen(true);
        setClose(true);
      } else {
        setNewOpen(false);
      }
    }, 0);
    return () => {
      if (!isPopup) clearTimeout(timeoutId);
    };
  }, [open, isPopup]);

  return (
    <>
      {(open || close) && (
        <PopupBackWrapper onClick={handleClickOutside}>
          <PopupContainer
            borderRadius={borderRadius}
            padding={padding}
            open={newOpen}
            width={width}
            ref={popupRef}
          >
            {popContent}
            {Cross && (
              <XCircle onClick={() => toggler(false)}>
                <X size={34} />
              </XCircle>
            )}
          </PopupContainer>
        </PopupBackWrapper>
      )}
    </>
  );
};

DashboardPopup.propTypes = {
  popContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.node,
  ]),
  open: PropTypes.bool,
  toggler: PropTypes.func,
  padding: PropTypes.string,
  Cross: PropTypes.bool,
  borderRadius: PropTypes.string,
  isPopup: PropTypes.bool,
  width: PropTypes.string,
  setSelectedPath: PropTypes.func,
};

export default DashboardPopup;
