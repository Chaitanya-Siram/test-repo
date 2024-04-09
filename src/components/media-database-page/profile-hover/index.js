import React from 'react';
import Proptypes from 'prop-types';
import {
  MainWrp,
  ProfileDescription,
  ProfileTitle,
  BorderDiv,
  StatsWrp,
  StatsItem,
  StatsItemLabel,
  StatsItemValue,
  CardBottom,
  SocialMediaWrp,
  MediaContainer,
  TagsWrp,
} from './index.sc';
import { TagContainer, TagText } from '../profile-card/index.sc';
import Twitter from '../../../assets/icons/Twitter';
import LinkedIn from '../../../assets/icons/LinkedIn';
import Instagram from '../../../assets/icons/Instagram';
import Facebook from '../../../assets/icons/Facebook';

const profileStats = [
  {
    label: 'Articles',
    value: 'articles',
    count: 146,
  },
  {
    label: 'Top Articles',
    value: 'top_articles',
    count: 27,
  },
  {
    label: 'Trending Articles',
    value: 'trending_articles',
    count: 3,
  },
];
const tags = [
  'Media',
  'Fashion',
  'Fashion',
  'XXXXXX',
  'XXXXXX',
  'XXXXXX',
  'XXXXXX',
];

const ProfileCardHover = ({ profile }) => {
  return (
    <>
      <MainWrp>
        <ProfileTitle>{profile.name}</ProfileTitle>
        <ProfileDescription>
          William Douglast is former senior editor at mit-tech.com and former
          managing editor at American Express. His byline has appeared on Fox
          News, Forbes, Entrepreneur and other outlets. Marv earned MPA, BBA and
          BA degrees from the University of Texas at Austin. (Cards)
        </ProfileDescription>
        <BorderDiv></BorderDiv>
        <StatsWrp>
          {profileStats.map((ele, i) => (
            <StatsItem key={i}>
              <StatsItemLabel>{ele?.count}</StatsItemLabel>
              <StatsItemValue>{ele?.label}</StatsItemValue>
            </StatsItem>
          ))}
        </StatsWrp>
        <BorderDiv></BorderDiv>
        <CardBottom>
          <TagsWrp>
            {tags.map((tag, i) => {
              return (
                <TagContainer id={i} key={i}>
                  <TagText id={i}>{tag}</TagText>
                </TagContainer>
              );
            })}
          </TagsWrp>
          <SocialMediaWrp>
            <MediaContainer>
              <Twitter />
            </MediaContainer>
            <MediaContainer>
              <LinkedIn />
            </MediaContainer>
            <MediaContainer>
              <Instagram />
            </MediaContainer>
            <MediaContainer>
              <Facebook />
            </MediaContainer>
          </SocialMediaWrp>
        </CardBottom>
        {/* <FooterContainer></FooterContainer> */}
      </MainWrp>
    </>
  );
};

export default ProfileCardHover;

ProfileCardHover.propTypes = {
  profile: Proptypes.object,
};
