import React from 'react';
import { CrossWrp, TitleWrp, TopTitle, TopWrp } from './index.sc';
import AMX from '../../assets/icons/AMX';
import Close from '../../assets/icons/Close';
import { useNavigate } from 'react-router-dom';

const MediaDatabaseTop = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <TopWrp>
      <TitleWrp>
        <AMX />
        <TopTitle onClick={handleClose}>AplhametriX</TopTitle>
      </TitleWrp>
      <CrossWrp onClick={handleClose}>
        <Close color={'#000'} />
      </CrossWrp>
    </TopWrp>
  );
};

export default MediaDatabaseTop;
