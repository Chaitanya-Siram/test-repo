import React, { useState } from 'react';
import {
  ContentWrpr,
  Inputwrpr,
  Labelwrpr,
  Descriptionwrpr,
  TitlesBox,
  Titlewrpr,
  SubTitle,
  Line,
  BoxWrapper,
  BoxTitle,
  CheckBoxwrapper,
  CheckBoxtxt,
  CheckBox,
  ButtonContainer,
  PopButton,
  ButtonTxt,
} from './index.sc';
import Proptypes from 'prop-types';
import Plus from '../../assets/icons/Plus';

export const PopInput = ({
  placeholder = 'Dashboard name',
  val = '',
  setVal = () => {},
}) => {
  return (
    <Labelwrpr>
      <Inputwrpr
        placeholder={placeholder}
        onChange={(e) => setVal(e.target.value)}
        value={val}
      />
    </Labelwrpr>
  );
};

PopInput.propTypes = {
  placeholder: Proptypes.string,
  val: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  setVal: Proptypes.func,
};

export const OverviewContent = ({
  title = 'Create New Dashboard',
  des = 'for search - GUCCI',
  subTitle = 'Select Widgets',
  toggler = () => {},
  Widget,
}) => {
  const [inpVal, setInpVal] = useState('');

  return (
    <ContentWrpr>
      <TitlesBox>
        <Titlewrpr>{title}</Titlewrpr>
        <Descriptionwrpr>{des}</Descriptionwrpr>
      </TitlesBox>
      <PopInput setVal={setInpVal} val={inpVal} />
      <SubTitle>{subTitle}</SubTitle>
      <Line></Line>
      <BoxWrapper>
        <BoxTitle>{Widget.type}</BoxTitle>
        {Widget.checkbox.map((ele) => (
          <CheckBoxwrapper key={ele.key}>
            <CheckBox type="checkbox" />
            <CheckBoxtxt>{ele.label}</CheckBoxtxt>
          </CheckBoxwrapper>
        ))}
      </BoxWrapper>
      <ButtonContainer>
        <PopButton onClick={() => toggler(false)} background="#585858">
          <ButtonTxt>Cancel</ButtonTxt>
        </PopButton>
        <PopButton background="#675EF2">
          <Plus />
          <ButtonTxt>Create</ButtonTxt>
        </PopButton>
      </ButtonContainer>
    </ContentWrpr>
  );
};

OverviewContent.propTypes = {
  title: Proptypes.string,
  des: Proptypes.oneOfType([Proptypes.string, Proptypes.node]),
  subTitle: Proptypes.string,
  boxTitle: Proptypes.string,
  toggler: Proptypes.func,
  Widget: Proptypes.object,
};
