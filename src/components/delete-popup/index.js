import React from 'react';
import Proptypes from 'prop-types';
import { BtnWrp, ContentWrp, HeadingText, MainWrp, PopupWrp } from './index.sc';
import { Button } from '../button';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';

const DeletePopup = ({
  setOpenedIndex,
  handleDeleteItem = () => {},
  handleCloseDeletePopup = () => {},
  index,
}) => {
  function handleSubmit() {
    handleDeleteItem(index);
    handleCloseDeletePopup();
  }

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  return (
    <PopupWrp>
      <MainWrp>
        <ContentWrp>
          <HeadingText>Sure you want to remove?</HeadingText>
        </ContentWrp>
        <BtnWrp>
          <Button
            title={'Cancel'}
            backgroundColor={'#F6F7FB'}
            color={'#000000'}
            onClick={(event) => {
              event.stopPropagation();
              handleCloseDeletePopup(event);
            }}
            // btnStyle={addBtnStyle}
          />
          <Button
            title={'Apply'}
            backgroundColor={theme[selectedTheme].primary}
            onClick={(event) => handleSubmit(index, event)}
          />
        </BtnWrp>
      </MainWrp>
    </PopupWrp>
  );
};

DeletePopup.propTypes = {
  pos: Proptypes.any,
  setOpenedIndex: Proptypes.func,
  handleDeleteItem: Proptypes.func,
  handleCloseDeletePopup: Proptypes.func,
  index: Proptypes.number,
};

export default DeletePopup;
