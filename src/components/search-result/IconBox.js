import React, { useEffect, useRef, useState } from 'react';
import {
  Dot,
  IconBoxwpr,
  Iconwpr,
  InputIconWrapper,
  InputSearchBar,
  SearchInputSeaction,
  SearchMainWrraper,
} from './index.sc';
import SearchIcon2 from '../../assets/icons/SearchIcon2';
import IconPop from '../icon-popup';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import FilterIcon from '../../assets/icons/FilterIcon';
import SortIcon from '../../assets/icons/SortIcon';
import PropTypes from 'prop-types';
import SortDropdown from './SortDropdown';
import CircularLoading from '../../assets/icons/loading/circularLoading';
import X from '../../assets/icons/X';
import Tooltip from '../icon-tooltip';
import { useDispatch } from 'react-redux';
import { setInput } from '../../redux/slices/searchInputSlice';

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
export const dropdownOptions = [
  {
    label: 'Relevance',
    value: 'relevance',
  },
  {
    label: 'Date Published',
    value: 'date',
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
const filterDropDownOptions = [
  {
    label: 'Bookmarked',
    value: 'bookmarked',
  },
  {
    label: 'Relevance',
    value: 'relevance',
  },
];
// const DownloadDropDownOptions = [
//   {
//     label: 'Download Selceted',
//     value: 'selected',
//   },
//   {
//     label: 'Bookmarked',
//     value: 'bookmarked',
//   },
//   {
//     label: 'Tagged',
//     value: 'tagged',
//   },
// ];
const IconBox = ({
  articleType,
  page,
  type,
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  setArticleType,
  downLoadFunction,
  downloading,
  filter,
  setFilter,
  setClickedPosition,
  checked,
  setDownLoadArticleFlag,
  setDownloadSelected,
  name,
}) => {
  const DownloadDropDownOptions = [
    {
      label: 'Download Selected',
      value: 'selected',
    },
    {
      label: 'Download All',
      value: 'downloadAll',
    },
  ];

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(!!searchQuery);
  const [isFilterValue, setIsFilterValue] = useState(false);
  const [sortPopUp, setSortPopUp] = useState(false);
  const [isDownloadPopUp, setDownloadPopUp] = useState(false);
  const [searchKey, setSearchKey] = useState(searchQuery);
  const inputRef = useRef(null);
  const iconBoxRef = useRef(null);
  const handleClickOutside = (event) => {
    if (iconBoxRef.current && !iconBoxRef.current.contains(event.target)) {
      setIsFilterValue(false);
      setSortPopUp(false);
      setDownloadPopUp(false);
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // console.log(page, 'this is a page', type, sortOrder);

  const handleDownloadClick = (id) => {
    downLoadFunction();
  };
  const handleSearchIconClick = () => {
    setIsOpen((prevOpen) => !prevOpen);
    setSortPopUp(false);
    setDownloadPopUp(false);
    setIsFilterValue(false);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleSearch = () => {
    setIsOpen((prevOpen) => !prevOpen);
    setSortPopUp(false);
    setIsFilterValue(false);
    setDownloadPopUp(false);
    setSearchQuery(searchKey);
  };
  const handleSortClick = () => {
    setIsFilterValue(false);
    setDownloadPopUp(false);
    setSortPopUp((prevOpen) => !prevOpen);
    setIsOpen(false);
  };

  const handleSort = (value) => {
    setIsOpen(false);
    setSortOrder((prev) => (prev === value ? '' : value));
    setSortPopUp(false);
  };

  const handleFilterClick = () => {
    setIsOpen(false);
    setSortPopUp(false);
    setIsFilterValue((prev) => !prev);
  };
  const handleFilter = (value) => {
    setIsOpen(false);
    setDownloadPopUp(false);
    setFilter((prev) => (prev === value ? '' : value));
    setIsFilterValue(false);
  };

  const handleDownload = () => {
    setIsOpen(false);
    setSortPopUp(false);
    setIsFilterValue(false);
    setDownloadPopUp((prev) => !prev);
  };

  const handleDownloadFn = (value) => {
    setDownLoadArticleFlag(true);
    downLoadFunction(value);
    setDownloadPopUp(false);
  };
  // open popup on enter keypress and dispatch search input to trigger searchInSearch API call with updated data
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setArticleType({
        ...articleType,
        isSearch: true,
        inSyndication: false,
      });
      setClickedPosition(1);
      setSearchQuery && setSearchQuery(searchKey);
      dispatch(setInput(searchKey));
      setSearchKey('');
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <SortDropdown
        Open={isDownloadPopUp}
        setIsDropdownOpen={handleDownloadFn}
        setSortOrder={setDownloadPopUp}
        sortOrder={''}
        dropdownOptions={DownloadDropDownOptions}
        checked={checked?.length}
        setDownloadSelected={setDownloadSelected}
      />
      <IconBoxwpr ref={iconBoxRef}>
        {/* Download Button */}

        <SearchMainWrraper>
          <Tooltip content="Download">
            <Iconwpr onClick={handleDownload} hasSortOrder={filter !== ''}>
              {downloading ? (
                <CircularLoading
                  bgColor="#ffffff"
                  size="0.25rem"
                  width="1rem"
                  height="1rem"
                />
              ) : (
                <DownloadIcon color="white" />
              )}
              {/* {filter !== '' && <Dot></Dot>} */}
            </Iconwpr>
          </Tooltip>
        </SearchMainWrraper>
        {isOpen && (
          <SearchInputSeaction isOpen={isOpen}>
            <InputSearchBar
              onChange={(e) => {
                setSearchKey(e.target.value);
                // setSearchQuery && setSearchQuery(e.target.value);
              }}
              ref={inputRef}
              onKeyDown={(e) => {
                handleKeyPress(e);
              }}
              value={searchKey}
              type="text"
              placeholder="Search"
            />
            <InputIconWrapper onClick={handleSearch}>
              <X size="20" color="white" />
            </InputIconWrapper>
          </SearchInputSeaction>
        )}
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

        {/* Filter Button */}
        {/* <SearchMainWrraper>
        <Tooltip content="Filter">
          <Iconwpr onClick={handleFilterClick} hasSortOrder={filter !== ''}>
            <FilterIcon color="white" />
            {filter !== '' && <Dot></Dot>}
          </Iconwpr>
        </Tooltip>
        <SortDropdown
          Open={isFilterValue}
          setIsDropdownOpen={handleFilter}
          setSortOrder={setFilter}
          sortOrder={filter}
          dropdownOptions={filterDropDownOptions}
        />
      </SearchMainWrraper> */}
        {/* Sorting Button */}
        {/* <SearchMainWrraper>
        <Tooltip content="Sort">
          <Iconwpr onClick={handleSortClick} hasSortOrder={sortOrder !== ''}>
            <SortIcon color="white" />
            {sortOrder !== '' && <Dot></Dot>}
          </Iconwpr>
        </Tooltip>
        <SortDropdown
          Open={sortPopUp}
          setIsDropdownOpen={handleSort}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
          setIsOpen={setIsOpen}
          dropdownOptions={dropdownOptions}
        />
      </SearchMainWrraper> */}
      </IconBoxwpr>
    </div>
  );
};

IconBox.propTypes = {
  page: PropTypes.number,
  type: PropTypes.string,
  sortOrder: PropTypes.string,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  setSortOrder: PropTypes.func,
  downLoadFunction: PropTypes.func,
  downloading: PropTypes.bool,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  setClickedPosition: PropTypes.func,
  setArticleType: PropTypes.func,
  checked: PropTypes.array,
  setDownLoadArticleFlag: PropTypes.func,
  setDownloadSelected: PropTypes.func,
  articleType: PropTypes.object,
  name: PropTypes.string,
};
export default IconBox;
