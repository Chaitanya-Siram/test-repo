import React, { useState, useEffect } from 'react';
import MediaDatabaseSearchSection from '../../../components/media-database-page/media-database-search-section';
import { MainWrp } from './index.sc';
import ProfileRelevanceSection from './profile-relevance-section';
import ProfilesSection from './profile-section';
import Proptypes from 'prop-types';
import { axiosGet, axiosPostRequest } from '../../../service';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '../../../hooks/useDebounce';
import { DeleteTextWpr } from '../../../components/search-popup/index.sc';
import { DeleteMainWrp } from './profile-section/index.sc';
import DownloadIcon from '../../../assets/icons/DownloadIcon';

const MediaDatabaseBottom = ({
  profileSelected = true,
  setProfileSelected,
}) => {
  const [searchKey, setSearchKey] = useState('');
  const [title, setTitle] = useState('');
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [sort, setSort] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const debouncedSearch = useDebounce(searchKey, 1000);
  const debouncedTitle = useDebounce(title, 1000);

  const getProfiles = () => {
    const queryParameters = {
      search: debouncedSearch,
      title: debouncedTitle,
      countries,
      languages,
      sort,
    };
    return axiosGet('/profiles', queryParameters);
  };

  const { isLoading, data } = useQuery({
    queryKey: [
      'profiles',
      debouncedSearch,
      debouncedTitle,
      countries,
      languages,
      sort,
    ],
    queryFn: () =>
      getProfiles(debouncedSearch, debouncedTitle, countries, languages, sort),
    refetchOnWindowFocus: false,
  });
  const profileData = data?.data?.data;

  useEffect(() => {
    if (
      profileData?.length > 0 &&
      selectedRows?.length === profileData?.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, profileData]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const rowIds = profileData.map((item) => item.id);
      setSelectedRows(rowIds);
    }

    setSelectAll((prevSelectAll) => !prevSelectAll);
  };
  const toggleRowSelection = (rowId) => {
    let updatedRows;
    if (selectedRows.includes(rowId)) {
      updatedRows = selectedRows.filter((id) => id !== rowId);
    } else {
      updatedRows = [...selectedRows, rowId];
    }
    setSelectedRows(updatedRows);
  };

  const downloadProfileList = () => {
    return axiosPostRequest('/download-profile-lists', {}, { selectedRows });
  };

  return (
    <MainWrp>
      <MediaDatabaseSearchSection
        setSearchKey={setSearchKey}
        setTitle={setTitle}
        setCountries={setCountries}
        setLanguages={setLanguages}
      />
      <ProfileRelevanceSection
        profileNumber={data?.data?.data.length}
        setSort={setSort}
        sort={sort}
        toggleSelectAll={toggleSelectAll}
        selectAll={selectAll}
      />
      <ProfilesSection
        profiles={data?.data?.data}
        loader={isLoading}
        selectedRows={selectedRows}
        toggleRowSelection={toggleRowSelection}
      />
      {selectedRows.length > 0 && (
        <DeleteMainWrp onClick={downloadProfileList}>
          <DownloadIcon color="white" />
          <DeleteTextWpr>Download</DeleteTextWpr>
        </DeleteMainWrp>
      )}
    </MainWrp>
  );
};

MediaDatabaseBottom.propTypes = {
  profileSelected: Proptypes.bool,
  setProfileSelected: Proptypes.func,
};

export default MediaDatabaseBottom;
