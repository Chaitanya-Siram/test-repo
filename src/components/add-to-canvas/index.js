import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import CustomDrawer from '../custom-drawer';
import DashboardPopup from '../dasboard-popup';
import NewCanDrawer from '../custom-drawer/new-canvas';
const AddtoCanvas = ({ open, toggler, CanvasList }) => {
  const [show, setShow] = useState(false);
  const handleClick = (item) => {
    console.log(item);
    setShow(true);
  };

  useEffect(() => {
    setShow(false);
  }, [open]);

  return (
    <DashboardPopup
      open={open}
      toggler={toggler}
      popContent={
        show ? (
          <NewCanDrawer toggler={toggler} />
        ) : (
          <CustomDrawer
            toggler={toggler}
            isList={true}
            CanvasList={CanvasList}
            Items={[{}]}
            listClick={handleClick}
          />
        )
      }
      padding="0"
      borderRadius="0.75rem"
    />
  );
};

AddtoCanvas.propTypes = {
  open: PropTypes.bool,
  toggler: PropTypes.func,
  CanvasList: PropTypes.arrayOf(object),
};

export default AddtoCanvas;
