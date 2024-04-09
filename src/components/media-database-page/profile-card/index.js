import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import {
  CardBottom,
  CardMiddle,
  CardTop,
  CardTopWrp,
  CheckBoxWrp,
  DescrWrp,
  ExtraTagText,
  IconWrap,
  InfoIconWrap,
  MainWrp,
  ProfileImage,
  ProfileName,
  ScoreText,
  ScoreWrp,
  SubText,
  TagContainer,
  TagLengthContainer,
  TagText,
  TagsWrp,
  TopAuthorText,
  TopAuthorWrp,
  TopLeftWrp,
} from './index.sc';
import TopAuthorStar from '../../../assets/icons/TopAuthorStar';
import CheckCircle from '../../../assets/icons/CheckCircle';
import { useNavigate } from 'react-router-dom';
import CheckboxIcon from '../../../assets/icons/CheckboxIcon';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import ProfileInfoIcon from '../../../assets/icons/ProfileInfoIcon';
import { RightDiv } from '../../../pages/media-database/media-database-bottom/profile-section/index.sc';
import ProfileCardHover from '../profile-hover';

const ProfileCard = ({ profile, selectedRows, toggleRowSelection }) => {
  const [tags, setTags] = useState([]);
  const [tagLength, setTagLength] = useState(null);

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const navigate = useNavigate();

  useEffect(() => {
    const requiredTags = profile.tags.slice(0, 4);
    setTags(requiredTags);
    setTagLength(profile.tags.length - requiredTags.length);
  }, [profile]);

  function handleClick() {
    navigate(`/media-database/${profile.id}`);
  }
  return (
    <MainWrp onClick={handleClick}>
      <CardTop>
        <CardTopWrp>
          <TopLeftWrp>
            <CheckBoxWrp
              onClick={(e) => {
                e.stopPropagation();
                toggleRowSelection(profile.id);
              }}
            >
              <CheckboxIcon
                width="1.5rem"
                height="1.5rem"
                color={
                  selectedRows.includes(profile.id)
                    ? theme[selectedTheme].primary
                    : 'white'
                }
                borderColor={
                  selectedRows.includes(profile.id)
                    ? theme[selectedTheme].primary
                    : '#5C5E60'
                }
              />
            </CheckBoxWrp>
            {profile.topAuthor && (
              <TopAuthorWrp>
                <TopAuthorStar />
                <TopAuthorText>Top Author</TopAuthorText>
              </TopAuthorWrp>
            )}
          </TopLeftWrp>
          <InfoIconWrap>
            <ProfileInfoIcon />
            <RightDiv className="right-card">
              <ProfileCardHover profile={profile} />
            </RightDiv>
          </InfoIconWrap>
          <IconWrap>
            <CheckCircle />
          </IconWrap>
        </CardTopWrp>
        <ProfileImage image={profile.profilePicture} />
      </CardTop>
      <CardMiddle>
        <DescrWrp>
          <ProfileName>{profile.name}</ProfileName>
          <SubText>{profile.occupation}</SubText>
        </DescrWrp>
        <ScoreWrp>
          <ScoreText>{profile.journalistScore}</ScoreText>
          <SubText>Journalist Score</SubText>
        </ScoreWrp>
      </CardMiddle>
      <CardBottom>
        <TagsWrp>
          {tags.map((tag, i) => {
            return (
              <TagContainer id={i} key={i}>
                <TagText id={i}>{tag}</TagText>
              </TagContainer>
            );
          })}
          <TagLengthContainer>
            <ExtraTagText>+ {tagLength} More</ExtraTagText>
          </TagLengthContainer>
        </TagsWrp>
      </CardBottom>
    </MainWrp>
  );
};

ProfileCard.propTypes = {
  profile: Proptypes.object,
  setSelectedCard: Proptypes.func,
  selectedRows: Proptypes.arrayOf(Proptypes.number),
  toggleRowSelection: Proptypes.func,
};

export default ProfileCard;
