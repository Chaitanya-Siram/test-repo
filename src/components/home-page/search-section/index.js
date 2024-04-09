import React, { useState } from 'react';
import { Section } from '../../../styles/index.sc';
import { SearchWrp, NavWrp, SearchFocusBackdrop } from './index.sc';
import NavSection from '../../nav-section';
import SearchComponent from '../../search-component';
import { useNavigate } from 'react-router-dom';
import NotificationPopup from '../../notification-popup';
import { getTokenData } from '../../../constants/validateToken';

const SearchSection = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [guidedSection, setGuidedSection] = useState(false);
  const [notificationPopupIsOpen, setNotificationPopupIsOpen] = useState(false);
  const tokenData = getTokenData();
  const navigate = useNavigate();

  const handleSearchInputFocus = (isFocused) => {
    setIsSearchFocused(isFocused);
  };

  const handleGuidedToggle = (isFocused) => {
    setGuidedSection(isFocused);
  };

  const handleBackdropClick = () => {
    setGuidedSection(false);
    setIsSearchFocused(false);
  };

  const handleSearchValue = (data, filters) => {
    navigate(
      `/search-results/custom-search/overview/${data?.recent_search_id}`,
      {
        state: {
          data: null,
          filters,
          isGuidedSearch: filters?.isGuidedSearch,
        },
      }
    );
  };

  const handleCancelSearch = () => {
    setGuidedSection(false);
    setIsSearchFocused(false);
  };

  const handleNotificationClick = () => {
    setNotificationPopupIsOpen((prev) => !prev);
  };

  return (
    <Section
      sectionStyle={{
        height: '22%',
        backgroundColor: 'transparent',
        padding: '0rem 1.5rem ',
        marginBottom: '1rem',
        display: 'flex',
        gap: '1rem',
        position: 'relative',
      }}
    >
      {tokenData?.role !== 'Analyst' && (
        <>
          <SearchFocusBackdrop
            className={`backdrop ${isSearchFocused ? 'active' : ''}`}
            onClick={handleBackdropClick}
          ></SearchFocusBackdrop>
          <SearchWrp
            id="search-wrp"
            className={`search-wrapper ${isSearchFocused ? 'active' : ''}`}
          >
            <SearchComponent
              onSearchInputFocus={handleSearchInputFocus}
              onGuidedToggleFocus={handleGuidedToggle}
              isFocused={isSearchFocused}
              handleSearchValue={handleSearchValue}
              guidedSection={guidedSection}
              handleCancelSearch={handleCancelSearch}
              createSearch={true}
            />
          </SearchWrp>
          {notificationPopupIsOpen && (
            <NotificationPopup
              notificationPopupIsOpen={notificationPopupIsOpen}
              handleNotificationPopup={handleNotificationClick}
              isAlert={true}
            />
          )}
        </>
      )}
      <NavWrp id="nav-wrp" role={tokenData?.role}>
        <NavSection
          notificationPopupIsOpen={notificationPopupIsOpen}
          handleNotificationClick={handleNotificationClick}
        />
      </NavWrp>
    </Section>
  );
};

export default SearchSection;
