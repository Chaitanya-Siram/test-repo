import React from 'react';
import PropTypes from 'prop-types';
import { theme } from '../../constants/theme';
import {
  // ButtonCmp,
  ButtonWrp,
  DescritptionWrp,
  HeaderSection,
  HeadingWrp,
  IconWrp,
  MainWrp,
} from './index.sc';
import { Button } from '../button';
import X from '../../assets/icons/X';

const CustomConfirmationPopUp = ({
  width,
  Heading,
  SecondHeading,
  toggler,
  handleDelete,
  actionLabel = 'Delete',
}) => {
  return (
    <MainWrp width={width}>
      <HeaderSection>
        <HeadingWrp>{Heading}</HeadingWrp>
        <IconWrp onClick={() => toggler(false)}>
          <X size="34" />
        </IconWrp>
      </HeaderSection>
      <DescritptionWrp>{SecondHeading}</DescritptionWrp>
      <ButtonWrp>
        <Button
          title="Cancel"
          backgroundColor={'#fff'}
          color={'#675EF2'}
          onClick={() => {
            toggler(false);
          }}
          btnStyle={{
            width: 'auto',
            borderRadius: '0.5rem',
            border: ' 1px solid #675EF2',
          }}
        />
        <Button
          title={actionLabel}
          backgroundColor={'#675EF2'}
          color={theme.dark.text}
          onClick={handleDelete}
          btnStyle={{ width: 'auto', borderRadius: '0.5rem' }}
        />
      </ButtonWrp>
    </MainWrp>
  );
};
CustomConfirmationPopUp.propTypes = {
  width: PropTypes.string,
  Heading: PropTypes.string,
  SecondHeading: PropTypes.string,
  toggler: PropTypes.func,
  handleDelete: PropTypes.func,
  selectedTab: PropTypes.string,
  actionLabel: PropTypes.string,
};
export default CustomConfirmationPopUp;
