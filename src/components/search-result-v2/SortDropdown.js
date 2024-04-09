import React from 'react';
import PropTypes from 'prop-types';
import { DropdownWrapper, SortOption } from './index.sc';

const dropdownOptions = [
  {
    label: 'Relevance',
    value: 'relevance',
  },
  {
    label: 'Data Published',
    value: 'date_published',
  },
  {
    label: 'Reach',
    value: 'reach',
  },
  {
    label: 'AVE',
    value: 'ave',
  },
  {
    label: 'Sentiment',
    value: 'sentiment',
  },
  // {
  //   label: 'Bookmarked',
  //   value: 'bookmarked',
  // },
];

const SortDropdown = ({ isOpen, setIsDropdownOpen, setSortOrder }) => {
  const handleSortOptionClick = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  return (
    <DropdownWrapper isOpen={isOpen}>
      {dropdownOptions.map((item, i) => (
        <SortOption key={i} onClick={() => handleSortOptionClick(item.value)}>
          {item.label}
        </SortOption>
      ))}
    </DropdownWrapper>
  );
};

SortDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsDropdownOpen: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};

export default SortDropdown;
