import React from 'react';
import PropTypes from 'prop-types';
import {
  // ButtonCmp,
  ButtonWrp,
  DescMainWrp,
  DescritptionWrp,
  HeaderSection,
  HeadingWrp,
  IconWrp,
  MainWrp,
} from './index.sc';
import { theme } from '../../constants/theme';

// import Alert from '../../assets/icons/Alert';
import { Button } from '../button';
import X from '../../assets/icons/X';
const AlertPopUp = ({
  width,
  Heading,
  toggler,
  handleSave,
  actionLabel = 'Save & Continue',
  handleDontSave,
  description = '',
  setSelectedPath = () => {},
}) => {
  return (
    <MainWrp width={width}>
      <HeaderSection>
        <HeadingWrp>{Heading}</HeadingWrp>
        <IconWrp
          onClick={() => {
            toggler(false);
            setSelectedPath('');
          }}
        >
          <X size="34" />
        </IconWrp>
      </HeaderSection>
      <DescMainWrp>
        {/* <Alert /> */}
        <DescritptionWrp>
          {/* You are about to leave this page without saving.
          <br /> All the changes will be lost. Do you want to leave without
          savings? */}
          {description}
        </DescritptionWrp>
      </DescMainWrp>
      <ButtonWrp>
        {/* <ButtonCmp onClick={handleDontSave} outline={true}>
          {"Don't Save"}
        </ButtonCmp>
        <ButtonCmp onClick={handleSave} backgroundColor={true}>
          {actionLabel}
        </ButtonCmp> */}
        <Button
          title="Don't Save"
          backgroundColor={'#fff'}
          color={'#675EF2'}
          onClick={handleDontSave}
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
          onClick={handleSave}
          btnStyle={{ width: 'auto', borderRadius: '0.5rem' }}
        />
      </ButtonWrp>
    </MainWrp>
  );
};

export default AlertPopUp;
AlertPopUp.propTypes = {
  width: PropTypes.string,
  Heading: PropTypes.string,
  toggler: PropTypes.func,
  handleSave: PropTypes.func,
  handleDontSave: PropTypes.func,
  actionLabel: PropTypes.string,
  description: PropTypes.string,
  setSelectedPath: PropTypes.func,
};
