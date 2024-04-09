import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Containerwraper, IconBtnwpr, IconPopwpr, Itemwpr } from './index.sc';

const IconPop = ({
  children,
  Items = [],
  handleClick,
  currentItem,
  show = false,
  setShow,
}) => {
  const iconPopRef = useRef(null);

  const handleItemClick = (id) => {
    handleClick(id);
    setShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iconPopRef.current && !iconPopRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setShow]);

  return (
    <Containerwraper ref={iconPopRef}>
      <IconBtnwpr onClick={() => setShow(!show)}>{children}</IconBtnwpr>
      {show && (
        <IconPopwpr className="iconpop">
          {Items.map((item, i) => (
            <Itemwpr
              onClick={() => handleItemClick(item.id)}
              key={i}
              selected={currentItem && currentItem.id === item.id} // Set the selected prop here
            >
              {item.label}
            </Itemwpr>
          ))}
        </IconPopwpr>
      )}
    </Containerwraper>
  );
};

IconPop.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  Items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  handleClick: PropTypes.func,
  currentItem: PropTypes.string,
  show: PropTypes.bool,
  setShow: PropTypes.func,
};

export default IconPop;
