import React from 'react';
// import Tabs from 'tabs';

import Proptypes from 'prop-types';
import styled from 'styled-components';
import { addCountPrefix } from '../../constants/utils';

const TitleBoxwpr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.65rem 0.25rem;
`;

const Titlewrpr = styled.div`
  font-style: normal;
  line-height: 1.1875rem;
  text-align: center;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  text-transform: capitalize;
`;

const Deswpr = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #585858;
  margin-top: 0.25rem;
`;

const TabLabel = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0px;
  gap: 0.25rem;
  padding-bottom: 0.625rem;
`;

export const TitleBox = ({ title, des, isHideDes }) => {
  return (
    <TitleBoxwpr>
      <Titlewrpr>{title}</Titlewrpr>
      {isHideDes ? ' ' : <Deswpr>{addCountPrefix(parseInt(des) || 0)}</Deswpr>}
    </TitleBoxwpr>
  );
};

export const TabTitle = ({ title }) => {
  return <TabLabel>{title}</TabLabel>;
};

TitleBox.propTypes = {
  title: Proptypes.string.isRequired,
  des: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  isHideDes: Proptypes.bool,
};

TabTitle.propTypes = {
  title: Proptypes.string.isRequired,
};
