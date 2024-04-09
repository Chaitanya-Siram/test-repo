import React, { useRef } from 'react';
import {
  ButtonBoxwpr,
  ButtonWrp,
  ContentWrp,
  CrossButtonWrp,
  HeadingText,
  HeadingWrp,
  InputBox,
  InputWrp,
  MainWrp,
} from './index.sc';
import PropTypes from 'prop-types';
import { theme } from '../../../../../../constants/theme';
import Close from '../../../../../../assets/icons/Close';

const TextInputBox = ({ onSubmit, handleClose }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  function handleTextSubmit() {
    const titleValue = titleRef.current.value;
    const descriptionvalue = descriptionRef.current.value;
    onSubmit({ title: titleValue, description: descriptionvalue });
  }

  return (
    <MainWrp>
      <InputWrp>
        <HeadingWrp>
          <HeadingText>Add Article</HeadingText>
          <CrossButtonWrp onClick={handleClose}>
            <Close color={theme.dark.primary} />
          </CrossButtonWrp>
        </HeadingWrp>
        <ContentWrp>
          <InputBox ref={titleRef} placeholder="Title" />
          <InputBox ref={descriptionRef} placeholder="Content" />
        </ContentWrp>
        <ButtonWrp>
          <ButtonBoxwpr
            onClick={handleClose}
            fontColor={theme.dark.secondaryText}
            background={'#F6F7FB'}
          >
            CANCEL
          </ButtonBoxwpr>
          <ButtonBoxwpr
            fontColor={theme.dark.text}
            background={theme.dark.primary}
            onClick={handleTextSubmit}
          >
            ADD
          </ButtonBoxwpr>
        </ButtonWrp>
      </InputWrp>
    </MainWrp>
  );
};

TextInputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default TextInputBox;
