import Proptypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Arrow from '../dropdown/assets/Arrow';
import { theme } from '../../constants/theme';
import styled from 'styled-components';

export const DashboardTitle = ({ title, arrow = false, isOpen = false }) => {
  const [dropdownOpen, setDropdownOpen] = useState(isOpen);

  useEffect(() => {
    setDropdownOpen(isOpen);
  }, [isOpen]);

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  return (
    <TitleBoxwpr>
      <Titlewrpr>{title}</Titlewrpr>
      {arrow && (
        <Arrow
          className={'dropdown-arrow-icon'}
          fill={theme[selectedTheme].text}
          isOpen={dropdownOpen}
        />
      )}
    </TitleBoxwpr>
  );
};

DashboardTitle.propTypes = {
  title: Proptypes.string.isRequired,
  arrow: Proptypes.bool,
  isOpen: Proptypes.bool,
};

const TitleBoxwpr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0px;
  padding-bottom: 0.625rem;
`;
const Titlewrpr = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
`;
