import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { theme } from '../../../../constants/theme';

import {
  CheckBoxWrp,
  DropDownWrp,
  MainWrp,
  RelevanceText,
  SelectAllSection,
  SelectAllText,
  SortByOptionsText,
  SortWrp,
  TextContent,
  TopBarWrp,
  TopbarLeftSection,
  Wrp,
} from './index.sc';
import DownPolygon from '../../../../assets/icons/DownPolygon';
import CheckboxIcon from '../../../../assets/icons/CheckboxIcon';
import { useSelector } from 'react-redux';

const sortBy = [
  {
    type: 'relevance',
    label: 'Relevance',
  },
  {
    type: 'name',
    label: 'Name',
  },
];

const ProfileRelevanceSection = ({
  profileNumber,
  setSort,
  sort,
  toggleSelectAll,
  selectAll,
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const sortRef = useRef();
  const handleClickOutside = (event) => {
    if (sortRef.current && !sortRef.current.contains(event.target)) {
      setDropdownIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  function handleDropdownClick() {
    setDropdownIsOpen(!dropdownIsOpen);
  }

  function handleSelect(type) {
    console.log(sort === type);
    setSort(type);
    setDropdownIsOpen(false);
  }
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  return (
    <MainWrp>
      <TopBarWrp>
        <TopbarLeftSection>
          <TextContent>Profiles ({profileNumber})</TextContent>
          <SelectAllSection>
            <SelectAllText>Select All</SelectAllText>
            <CheckBoxWrp
              onClick={(e) => {
                e.stopPropagation();
                toggleSelectAll();
              }}
            >
              <CheckboxIcon
                width="1.5rem"
                height="1.5rem"
                color={selectAll ? theme[selectedTheme].primary : 'white'}
                borderColor={
                  selectAll ? theme[selectedTheme].primary : '#5C5E60'
                }
                checked={selectAll}
              />
            </CheckBoxWrp>
          </SelectAllSection>
        </TopbarLeftSection>
        <SortWrp ref={sortRef} onClick={handleDropdownClick}>
          <RelevanceText>Sort by</RelevanceText>
          <Wrp>
            {/* <SortByText>{sort.label}</SortByText> */}
            {dropdownIsOpen && (
              <DropDownWrp>
                {sortBy.map((item, i) => {
                  return (
                    <SortByOptionsText
                      key={i}
                      onClick={() => handleSelect(item.type)}
                      selected={item.type === sort}
                    >
                      {item.label}
                    </SortByOptionsText>
                  );
                })}
              </DropDownWrp>
            )}
          </Wrp>
          <DownPolygon fill={'#585858'} isOpen={dropdownIsOpen} />
        </SortWrp>
      </TopBarWrp>
    </MainWrp>
  );
};

ProfileRelevanceSection.propTypes = {
  profileNumber: Proptypes.number,
  setSort: Proptypes.func,
  sort: Proptypes.string,
  toggleSelectAll: Proptypes.func,
  selectAll: Proptypes.arrayOf(Proptypes.number),
};

export default ProfileRelevanceSection;
