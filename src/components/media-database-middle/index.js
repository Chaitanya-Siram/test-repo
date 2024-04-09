import React from 'react';
import {
  ContentWrp,
  CrossButtonWrp,
  JournalistText,
  MainWrp,
  MediaText,
  TextWrp,
} from './index.sc';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';
import ArrowLeft from '../../assets/icons/ArrowLeft';

const MediaDatabaseMiddle = ({ name }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  return (
    <MainWrp>
      <ContentWrp>
        <CrossButtonWrp onClick={handleClose}>
          <ArrowLeft color={theme[selectedTheme].text} width="32" height="32" />
        </CrossButtonWrp>
        <TextWrp>
          <MediaText>Media Database</MediaText>
          {name && <JournalistText>/ {name}</JournalistText>}
        </TextWrp>
      </ContentWrp>
    </MainWrp>
  );
};

MediaDatabaseMiddle.propTypes = {
  name: Proptypes.string,
};

export default MediaDatabaseMiddle;
