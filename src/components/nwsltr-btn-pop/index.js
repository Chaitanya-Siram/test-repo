import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Containerwraper, IconBtnwpr, IconPopwpr, Itemwpr } from './index.sc';

const Nwsbtnpop = ({ children, Items, handleClick }) => {
  const [show, setShow] = useState(false);
  const iconPopRef = useRef(null);

  const handleItemClick = (id) => {
    handleClick(id);
    setShow(false);
  };

  const handleClickOutside = (event) => {
    if (iconPopRef.current && !iconPopRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Containerwraper ref={iconPopRef}>
      <IconBtnwpr onClick={() => setShow(!show)}>{children}</IconBtnwpr>
      {show && (
        <IconPopwpr className="iconpop">
          {Items.map((item, i) => (
            <Itemwpr onClick={() => handleItemClick(item.id)} key={i}>
              {item.label}
            </Itemwpr>
          ))}
        </IconPopwpr>
      )}
    </Containerwraper>
  );
};

Nwsbtnpop.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  Items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  handleClick: PropTypes.func,
};

export default Nwsbtnpop;
