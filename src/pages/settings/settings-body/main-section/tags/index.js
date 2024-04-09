import React, { useState } from 'react';
import { theme } from '../../../../../constants/theme';
import {
  HeaderSection,
  Inputwrpr,
  LeftSection,
  RightSection,
  Searchwpr,
  TabContent,
  UserCountText,
  UserCountWrp,
  UsersText,
} from './index.sc';
import { useInfiniteQuery } from '@tanstack/react-query';

// import AddUserPopup from './add-user';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import useDebounce from '../../../../../hooks/useDebounce';
import { SearchIcon } from '../../../../../assets/icons/SearchIcon';
import { Button } from '../../../../../components/button';
import DashboardPopup from '../../../../../components/dasboard-popup';
import Customtable from '../../../../../components/table-component';
import { axiosGet, axiosPostRequest } from '../../../../../service';
import AddBlue from '../../../../../assets/icons/AddBlue';
import SaveSourcePopup from './save-theme';

const addBtnStyle = {
  color: theme.dark.text,
  fontFamily: 'Inter',
  fontSize: '0.9375rem',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: ' 1.125rem' /* 120% */,
  letterSpacing: '-0.01875rem',
};

const Themes = ({ handlePopupClick }) => {
  const user = useSelector((state) => state.user.data);

  const [showSavePopup, setShowSavePopup] = useState(false);

  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 1000);

  const pageLimit = 10;
  // const queryClient = useQueryClient();

  // const handleAddNewUser = (user) => {
  //   return axiosPostRequest('/add-user', {}, user);
  // };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  // const {
  //   mutate: addNewUser,
  //   data: newUserData,
  //   isSuccess,
  //   //  isError,
  //   //  error: addNewUserError,
  // } = useMutation({
  //   mutationFn: (newUser) => handleAddNewUser(newUser),
  //   onSuccess: () => {
  //     console.log(newUserData, 'newuserdata', isSuccess, 'Success');
  //     queryClient.invalidateQueries({ queryKey: ['users-data'] });
  //   },
  // });

  const handleShowAddUser = () => {
    setShowSavePopup((old) => !old);
  };

  const handleSaveTheme = ({ dashboardName, dashboardDescription }) => {
    const queryObject = {
      new_themes: {
        title: dashboardName,
        created_By: user?.firstName,
      },
      keyWords: dashboardDescription.split(','),
    };
    axiosPostRequest('/add-theme', {}, queryObject);
  };

  const getThemesData = async ({ pageParam = 1 }) => {
    return axiosGet('/themes', {
      limit: pageLimit,
      page: pageParam,
      search: debouncedSearch,
      sort_by: sortBy,
      sort_type: sortOrder,
    });
  };
  const {
    data: userData,
    error,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['theme-data', sortBy, sortOrder, debouncedSearch],
    queryFn: getThemesData,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    refetchOnWindowFocus: false,
  });

  const handleLoad = () => {
    fetchNextPage();
  };

  const handleSortClick = (value) => {
    if (value === sortBy) {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === 'asc' ? 'desc' : prevSortOrder === 'desc' ? '' : 'asc'
      );
    } else {
      setSortBy(value);
      setSortOrder('asc');
    }
  };

  const length = userData?.pages[0]?.data?.total;

  // add width as a property to each column and add value -- if required
  const tableHeaders = userData?.pages[0]?.data?.data?.themeTableHeaders;
  const tableData = userData?.pages[0].data?.data?.tableData;

  return (
    <>
      <TabContent>
        <HeaderSection>
          <LeftSection>
            <UsersText>Themes</UsersText>
            <UserCountWrp>
              <UserCountText>{length} Themes</UserCountText>
            </UserCountWrp>
          </LeftSection>
          <RightSection>
            <Searchwpr>
              <Inputwrpr
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon />
            </Searchwpr>
            <Button
              title="Add New theme"
              backgroundColor={theme[selectedTheme].primary}
              icon={
                <AddBlue
                  width="10"
                  height="10"
                  color={theme[selectedTheme].background}
                />
              }
              btnStyle={addBtnStyle}
              onClick={handleShowAddUser}
            />
          </RightSection>
        </HeaderSection>
        <Customtable
          isLoading={isLoading}
          isError={error}
          tableHeaders={tableHeaders}
          tableData={tableData}
          handlePopupClick={handlePopupClick}
          length={length}
          data={userData}
          pageLimit={pageLimit}
          handleLoad={handleLoad}
          infiniteLoading={true}
          handleSortClick={handleSortClick}
          sortBy={sortBy}
          sortOrder={sortOrder}
          editIcon={true}
          tableFor="theme"
        />
      </TabContent>
      <DashboardPopup
        popContent={
          <SaveSourcePopup
            heading="Add New Theme"
            toggler={setShowSavePopup}
            primaryHeading="Theme Name"
            secondaryHeading="Keywords"
            // selectedItem={{
            //   name: formData?.theme_name?.title,
            //   description: formData?.keywords?.split(' OR '),
            // }}
            handleSaveDashboard={handleSaveTheme}
          />
        }
        open={showSavePopup}
        toggler={setShowSavePopup}
        padding="0"
        borderRadius="0.625rem"
        width={'43.75rem'}
      />
    </>
  );
};

Themes.propTypes = {
  handlePopupClick: Proptypes.func,
};

export default Themes;
