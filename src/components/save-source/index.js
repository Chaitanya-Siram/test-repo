import React, { useState } from 'react';
import {
  Contentwpr,
  HeaderWrp,
  IconWrp,
  Inputwpr,
  Labelbox,
  Labelwpr,
  TextAreaContainer,
  Titlewpr,
} from './index.sc';
import Proptypes from 'prop-types';
import {
  // ButtonBoxwpr,
  ButtonsContainer,
  FooterBoxwpr,
  LeftfootBoxwpr,
} from '../custom-drawer/index.sc';
import { theme } from '../../constants/theme';
import Close from '../../assets/icons/Close';
import { useSelector } from 'react-redux';
import { Button } from '../button';
import { ErrorTxt } from '../../pages/login/index.sc';

const SaveSourcePopup = ({
  toggler,
  heading = 'Save Search',
  primaryHeading = 'Dashboard Name',
  secondaryHeading = 'Description',
  buttonText,
  selectedItem = { name: '', description: '' },
  handleSaveDashboard = () => {},
  dashboardTitle = '',
}) => {
  const { name = '', description = '', id } = selectedItem;
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const [btnTxt, setBtnTxt] = useState(buttonText?.length ? buttonText : heading || 'Save Search');

  const handleToggle = () => {
    toggler(false);
  };

  const [dashboardName, setDashboardName] = useState(name || '');
  const [dashboardDescription, setDashboardDescription] = useState(
    description || ''
  );
  const [nameErrorText, setNameErrorText] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      setBtnTxt('Saving...');
      if (!dashboardName.length) {
        setNameErrorText('Name is required.');
        return;
      }
      setNameErrorText('');
      let isEdit = false;
      if (name) {
        isEdit = true;
      }
      handleSaveDashboard(
        { name: dashboardName, description: dashboardDescription, id },
        isEdit
      );
    } catch (error) {
      console.log(error);
    } finally {
      setBtnTxt(heading);
    }
    toggler(false);
  };

  return (
    <Contentwpr onSubmit={submitHandler}>
      <HeaderWrp>
        <Titlewpr>{heading}</Titlewpr>
        <IconWrp onClick={handleToggle}>
          <Close
            width="2.12rem"
            height="2.12rem"
            color={theme[selectedTheme].text}
          />
        </IconWrp>
      </HeaderWrp>
      <Labelbox>
        <span>{primaryHeading}</span>
        <Labelwpr htmlFor="Dashboard Name">
          <Inputwpr
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            id="dashboardName"
            placeholder={primaryHeading.toLowerCase()}
          />
        </Labelwpr>
        <ErrorTxt style={{ marginTop: '1em' }}>
          {nameErrorText && nameErrorText}
        </ErrorTxt>
      </Labelbox>
      <Labelbox>
        <span>{secondaryHeading}</span>
        <TextAreaContainer
          value={dashboardDescription}
          onChange={(e) => setDashboardDescription(e.target.value)}
          placeholder="Description"
        />
      </Labelbox>
      <FooterBoxwpr mt={1.25} style={{ padding: 0 }}>
        <LeftfootBoxwpr></LeftfootBoxwpr>
        <ButtonsContainer>
          <Button
            title={'Cancel'}
            backgroundColor={theme[selectedTheme].background}
            color={theme[selectedTheme].primary}
            onClick={handleToggle}
            border={theme[selectedTheme].primary}
          />
          <Button
            type="submit"
            title={btnTxt}
            backgroundColor={theme[selectedTheme].primary}
          />
        </ButtonsContainer>
      </FooterBoxwpr>
    </Contentwpr>
  );
};

SaveSourcePopup.propTypes = {
  toggler: Proptypes.func.isRequired,
  handleSaveDashboard: Proptypes.func,
  heading: Proptypes.string,
  selectedItem: Proptypes.object,
  dashboardTitle: Proptypes.string,
  primaryHeading: Proptypes.string,
  secondaryHeading: Proptypes.string,
  buttonText: Proptypes.string,
};

export default SaveSourcePopup;
