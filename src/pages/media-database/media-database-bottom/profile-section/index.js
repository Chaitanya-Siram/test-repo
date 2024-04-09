import React from 'react';
import Proptypes, { object } from 'prop-types';
import { CardWrp, FrontDiv, MainWrp } from './index.sc';
import ProfileCard from '../../../../components/media-database-page/profile-card';

const ProfilesSection = ({
  profiles,
  loader,
  selectedRows,
  toggleRowSelection,
}) => {
  return (
    <MainWrp>
      {loader ? (
        <div>Loading</div>
      ) : (
        profiles.map((profile, i) => {
          return (
            <CardWrp key={profile.id}>
              <FrontDiv>
                <ProfileCard
                  profile={profile}
                  selectedRows={selectedRows}
                  toggleRowSelection={toggleRowSelection}
                />
              </FrontDiv>
            </CardWrp>
          );
        })
      )}
    </MainWrp>
  );
};

ProfilesSection.propTypes = {
  profiles: Proptypes.arrayOf(object),
  loader: Proptypes.bool,
  selectedRows: Proptypes.arrayOf(Proptypes.number),
  toggleRowSelection: Proptypes.func,
};

export default ProfilesSection;
