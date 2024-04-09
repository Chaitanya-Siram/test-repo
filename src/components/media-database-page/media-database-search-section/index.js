import React from 'react';
import {
  BottomBarWrp,
  MainWrp,
  SearchInputs,
  SearchInputsWrp,
  SearchWrp,
} from './index.sc';
import Proptypes from 'prop-types';

import { SearchIcon } from '../../../assets/icons/SearchIcon';
import MultiselectDropdown from '../../dropdown';

const languageOptions = [{ label: 'English', value: 'english' }];
const countryOptions = [
  { label: 'Afghanistan', value: 'afghanistan' },
  { label: 'India', value: 'india' },
  { label: 'Brazil', value: 'brazil' },
  { label: 'Canada', value: 'canada' },
];

const searchInputs = [
  {
    title: 'Title',
  },

  {
    title: 'Source',
  },
  {
    title: 'Beats',
  },
  {
    title: 'Country/Location',
  },
  {
    title: 'Language',
  },
];

const MediaDatabaseSearchSection = ({
  setSearchKey,
  setTitle,
  setCountries,
  setLanguages,
}) => {
  return (
    <MainWrp>
      <SearchWrp>
        <SearchInputs
          placeholder="Search"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <SearchIcon width="1.15rem" height="1.15rem" />
      </SearchWrp>
      <BottomBarWrp>
        {searchInputs.map((item, i) => {
          return (
            <React.Fragment key={i}>
              {item.title === 'Language' ||
              item.title === 'Country/Location' ? (
                <>
                  <MultiselectDropdown
                    title={item.title}
                    name="include"
                    options={
                      item.title === 'Language'
                        ? languageOptions
                        : countryOptions
                    }
                    onSelect={(name, optionsSelected) => {
                      item.title === 'Language'
                        ? setLanguages(
                            optionsSelected.map((country) => country.value)
                          )
                        : setCountries(
                            optionsSelected.map((country) => country.value)
                          );
                    }}
                    count={true}
                    newWidth="15.5"
                    newHeight="2.375"
                    borderWidth="0"
                    dropdownListHeight="10.5"
                    deSelectAll={true}
                    selectAll={true}
                    applyDisabled={false}
                    showButtons={true}
                    hideFooter={true}
                  />
                </>
              ) : (
                <SearchInputsWrp>
                  <SearchInputs
                    placeholder={item.title}
                    onChange={(e) => {
                      item.title === 'Title'
                        ? setTitle(e.target.value)
                        : console.log('clicked');
                    }}
                  />
                </SearchInputsWrp>
              )}
            </React.Fragment>
          );
        })}
      </BottomBarWrp>
    </MainWrp>
  );
};
MediaDatabaseSearchSection.propTypes = {
  setSearchKey: Proptypes.func,
  setTitle: Proptypes.func,
  setCountries: Proptypes.func,
  setLanguages: Proptypes.func,
};

export default MediaDatabaseSearchSection;
