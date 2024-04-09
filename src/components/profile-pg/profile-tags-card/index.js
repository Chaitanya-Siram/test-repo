import React from 'react';
import PropTypes, { object } from 'prop-types';
import {
  SocialIcon,
  SocialLinksWrp,
  TagContainer,
  TagSecWrp,
  TagText,
  TagsWrp,
} from './index.sc';

const ProfileTagsCard = ({ tags, socialLinks }) => {
  return (
    <TagSecWrp>
      <TagsWrp>
        {tags.map((tag, i) => {
          return (
            <TagContainer id={i} key={i}>
              <TagText id={i}>{tag}</TagText>
            </TagContainer>
          );
        })}
      </TagsWrp>
      <SocialLinksWrp>
        {socialLinks.map((item, i) => {
          return (
            <SocialIcon
              key={i}
              image={item.image}
              href={item.link}
              target="_blank"
            />
          );
        })}
      </SocialLinksWrp>
    </TagSecWrp>
  );
};

ProfileTagsCard.propTypes = {
  tags: PropTypes.array,
  socialLinks: PropTypes.arrayOf(object),
};

export default ProfileTagsCard;
