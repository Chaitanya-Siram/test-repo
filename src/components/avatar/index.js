import React from 'react';
import Proptypes from 'prop-types';
import { AvatarWrapper } from './index.sc';

const Avatar = ({ name }) => {
  // const getRandomColor = () => {
  //   const colors = ['#FF4C4C', '#FFD34C', '#4CDBFF', '#59FF4C', '#FF4C91'];
  //   const randomIndex = Math.floor(Math.random() * colors.length);
  //   return colors[randomIndex];
  // };

  const backgroundColor = '#FF4C4C';

  const getInitials = (name) => {
    const nameArray = name.split(' ');
    if (nameArray.length === 1) {
      return nameArray[0].charAt(0).toUpperCase();
    } else {
      const firstName = nameArray[0].charAt(0).toUpperCase();
      const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
      return `${firstName}${lastName}`;
    }
  };

  const initials = getInitials(name);

  return (
    <AvatarWrapper backgroundColor={backgroundColor}>{initials}</AvatarWrapper>
  );
};

export default Avatar;

Avatar.propTypes = {
  name: Proptypes.string.isRequired,
};
