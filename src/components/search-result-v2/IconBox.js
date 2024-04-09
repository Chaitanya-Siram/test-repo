import React, { useRef, useState } from 'react';
import { IconBoxwpr, Iconwpr } from './index.sc';
import SearchIcon2 from '../../assets/icons/SearchIcon2';
import IconPop from '../icon-popup';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import FilterIcon from '../../assets/icons/FilterIcon';
import SortIcon from '../../assets/icons/SortIcon';
import PropTypes from 'prop-types';
import SortDropdown from './SortDropdown';

const downloadList = [
  {
    id: 0,
    label: 'PDF',
  },
  {
    id: 1,
    label: 'Excel',
  },
  {
    id: 2,
    label: 'CSV',
  },
];

const IconBox = ({
  page,
  type,
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);

  const iconBoxRef = useRef(null);

  // console.log(page, 'this is a page', type, sortOrder);

  const handleDownloadClick = (id) => {
    console.log(id);
  };
  const handleSearchIconClick = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleSortClick = () => {
    setIsDropdownOpen((prevOpen) => !prevOpen);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <IconBoxwpr isOpen={isOpen}>
      <input
        type="text"
        placeholder="Type your search query..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <Iconwpr onClick={handleSearchIconClick}>
        <SearchIcon2 color="white" />
      </Iconwpr>

      {false && (
        <IconPop handleClick={handleDownloadClick} Items={downloadList}>
          <Iconwpr>
            <DownloadIcon color="white" />
          </Iconwpr>
        </IconPop>
      )}
      <Iconwpr>
        <DownloadIcon color="white" />
      </Iconwpr>
      <Iconwpr>
        <FilterIcon color="white" />
      </Iconwpr>
      <Iconwpr
        ref={iconBoxRef}
        onClick={handleSortClick}
        hasSortOrder={sortOrder !== ''}
      >
        <SortIcon color="white" />
      </Iconwpr>
      <SortDropdown
        isOpen={isDropDownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        setSortOrder={setSortOrder}
      />
    </IconBoxwpr>
  );
};

IconBox.propTypes = {
  page: PropTypes.number,
  type: PropTypes.string,
  sortOrder: PropTypes.string,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  setSortOrder: PropTypes.func,
};
export default IconBox;
