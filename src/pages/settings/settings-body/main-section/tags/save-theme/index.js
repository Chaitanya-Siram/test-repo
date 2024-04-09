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
} from '../../../../../../components/custom-drawer/index.sc';
import { theme } from '../../../../../../constants/theme';
import { useSelector } from 'react-redux';
import Close from '../../../../../../assets/icons/Close';
import { Button } from '../../../../../../components/button';

const SaveSourcePopup = ({
  toggler,
  heading = 'Save Search',
  primaryHeading = 'Dashboard Name',
  secondaryHeading = 'Description',

  selectedItem = { name: '', description: '' },
  handleSaveDashboard = () => {},
  dashboardTitle = '',
}) => {
  const { name = '', description = '' } = selectedItem;
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const handleToggle = () => {
    toggler(false);
  };

  const [dashboardName, setDashboardName] = useState(name || '');
  const [dashboardDescription, setDashboardDescription] = useState(
    description || ''
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (!dashboardName.length && !dashboardDescription.length) {
      return;
    }
    handleSaveDashboard({ dashboardName, dashboardDescription });
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
        <Labelwpr htmlFor="dashboardName">
          <Inputwpr
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            id="dashboardName"
            placeholder={primaryHeading.toLocaleLowerCase()}
          />
        </Labelwpr>
      </Labelbox>
      <Labelbox>
        <span>{secondaryHeading}</span>
        <TextAreaContainer
          value={dashboardDescription}
          onChange={(e) => setDashboardDescription(e.target.value)}
          placeholder="Keywords"
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
          {/* <ButtonBoxwpr
            className="btn"
            background={theme[selectedTheme].primary}
            fontColor={theme[selectedTheme].logoText}
            disabled={!dashboardName.length || !dashboardDescription.length}
          >
            Save
          </ButtonBoxwpr> */}
          <Button
            title="Save"
            backgroundColor={theme[selectedTheme].primary}
            // onClick={handleTimeSubmit}
            disable={!dashboardName.length || !dashboardDescription.length}
            disableStyle={{
              background: theme[selectedTheme].borders,
              border: 'none',
              color: theme[selectedTheme].background,
            }}
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
};

export default SaveSourcePopup;
