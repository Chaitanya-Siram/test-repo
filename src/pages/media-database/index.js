import React from 'react';
import MediaDatabaseBottom from './media-database-bottom';
import MediaDatabaseMiddle from '../../components/media-database-middle';
import AppBG from '../../components/app-bg';
import AppHeader from '../../components/app-header';
import AppFooter from '../../components/app-footer';
import { MainWrp } from './index.sc';

const MediaDatabase = () => {
  return (
    <>
      <AppBG />
      <AppHeader />
      <MainWrp>
        <MediaDatabaseMiddle />
        <MediaDatabaseBottom />
      </MainWrp>
      <AppFooter />
    </>
  );
};

export default MediaDatabase;
