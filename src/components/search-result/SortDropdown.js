import React from 'react';
import PropTypes from 'prop-types';
import { DropdownWrapper, SelectedLgth, SortOption } from './index.sc';

const SortDropdown = ({
  Open,
  setIsDropdownOpen,
  sortOrder,
  dropdownOptions,
  isParentComponentFixed = false,
  checked,
  setDownloadSelected,
  left = '0',
  bottom = '1.5rem',
  marginBottom = '1.5rem',
  marginTop = 'none',
  position,
}) => {
  const handleSortOptionClick = (order) => {
    setIsDropdownOpen(order);
    setDownloadSelected && setDownloadSelected(order);
  };

  return (
    <DropdownWrapper
      isOpen={Open}
      isParentComponentFixed={isParentComponentFixed}
      checked={checked}
      selected={sortOrder !== ''}
      left={left}
      bottom={bottom}
      marginBottom={marginBottom}
      marginTop={marginTop}
      position={position}
    >
      {dropdownOptions.map((item, i) => (
        <SortOption
          selected={item.value === sortOrder}
          key={i}
          onClick={() => handleSortOptionClick(item.value)}
        >
          {item.label}{' '}
          {item.label === 'Download Selected' ? (
            <SelectedLgth>{checked}</SelectedLgth>
          ) : (
            ''
          )}
        </SortOption>
      ))}
    </DropdownWrapper>
  );
};

SortDropdown.propTypes = {
  Open: PropTypes.bool.isRequired,
  setIsDropdownOpen: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  sortOrder: PropTypes.string,
  dropdownOptions: PropTypes.arrayOf(Object),
  isParentComponentFixed: PropTypes.bool,
  left: PropTypes.string,
  bottom: PropTypes.string,
  marginBottom: PropTypes.string,
  marginTop: PropTypes.string,
  checked: PropTypes.string,
  setDownloadSelected: PropTypes.func,
  position: PropTypes.string,
};

export default SortDropdown;
