import React from 'react';
import { UserWrapper } from './index.sc';
import { useSelector } from 'react-redux';

const UserSection = () => {
  const user = useSelector((store) => {
    return store?.user?.data || {};
  });
  const { firstName } = user;

  return <UserWrapper>Hello {firstName}</UserWrapper>;
};

export default UserSection;
