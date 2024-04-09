import React, { useState } from 'react';
import Proptypes, { object } from 'prop-types';
import {
  // ButtonBoxwpr,
  // ButtonsContainer,
  // CarouselDotbox,
  // Dots,
  // FooterBoxwpr,
  // LeftfootBoxwpr,
  MainBoxwrp,
  MainTitleBox,
  MainTitlewrpr,
  SearchHeader,
  SearchPopwrpr,
} from './index.sc';
// import { theme } from '../../constants/theme';
import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosGet } from '../../service';
import { ContentBox } from '../search-popup/ContentBox';
// import { useSelector } from 'react-redux';
// import SecondPage from '../second-page';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { NewsltrContentBox } from '../newsletter-popup/NewsltrContentBox';

// const components = [
//   {
//     id: 0,
//     label: 'Select Search',
//     value: 'search',
//   },
//   {
//     id: 1,
//     label: 'Select Dashboard Type',
//     value: 'dashboard',
//   },
// ];

const CreateNewDashboard = ({
  mainTitle = 'Select Search',
  isNewsletter = false,
  toggler,
  handleClick = () => {},
  isPopup = true,
  Frames,
  isIcons = true,
  selectedDashboard,
}) => {
  // const selectedTheme = useSelector((store) => {
  //   return store?.theme.theme || {};
  // });
  const [checkeditems, setCheckedItems] = useState([]);
  // const queryClient = useQueryClient();
  const pageLimit = 10;
  const [fiterType, setFiterType] = useState('');

  const currentSlide = 0;
  // const [dashboard, setDashboard] = useState();
  const navigate = useNavigate();

  //   const navigate = useNavigate();

  // const handleToggle = () => {
  //   toggler(false);
  //   setSelectedSearch();
  // };

  const getSavedSearches = ({ pageParam, fiterType }) => {
    return axiosGet('/saved-search', {
      limit: pageLimit,
      page: pageParam,
      fiterType,
    });
  };

  const {
    // isLoading,
    // error,
    data,
    // isFetching,
    isLoading,
    // hasNextPage,
    fetchNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery(
    ['saved-searches', fiterType],
    async ({ pageParam = 1 }) => getSavedSearches({ pageParam, fiterType }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  // const [searchId, setSearchId] = useState('');

  console.log(data, 'saved-searches');

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleFilter = (type) => {
    setFiterType(type);
    // queryClient.invalidateQueries(['saved-searches', type]);
  };

  const handleSelectSearch = (data) => {
    console.log('handleSelectSearch', data);
    // setSelectedSearch(data);
    if (data && selectedDashboard !== 'custom') {
      navigate(`/dashboard/${data.id}/${selectedDashboard}/`);
    } else {
      handleClick(data.id);
    }
  };

  // const handleClickdot = (index) => {
  //   console.log(index, 'index');
  //   if (selectedSearch) setCurrentSlide(index);
  // };

  // const handleGenerateDashboard = () => {
  //   console.log('generate dashboard');
  //   console.log(dashboard);
  //   navigate(`dashboard/${searchId}/${dashboard.type}`);
  //   // const searchId = selectedSearch.id;
  //   // const dashboardType = type; // replace type with dashboard type
  //   // navigate(`dashboard/${searchId}/${dashboardType}`);
  // };

  const titleConfig = {
    0: 'Select Search',
    // 1: 'Select Dashboard',
  };

  return (
    <SearchPopwrpr isNewsletter={isNewsletter}>
      <SearchHeader>
        <MainTitleBox isNewsletter={isNewsletter}>
          <MainTitlewrpr isNewsletter={isNewsletter}>
            {titleConfig[currentSlide]}
          </MainTitlewrpr>
        </MainTitleBox>
      </SearchHeader>
      <MainBoxwrp>
        <ContentBox
          // data={data}
          checkeditems={checkeditems}
          isPopup={isPopup}
          Frames={Frames}
          handleLoad={handleLoadMore}
          handleCheckedItems={setCheckedItems}
          handleFilter={handleFilter}
          isLoading={isLoading}
          handleClick={handleSelectSearch}
          //   toggler={toggler}
          isIcons={isIcons}
          isCheckBox={false}
        />
      </MainBoxwrp>
    </SearchPopwrpr>
  );
};

CreateNewDashboard.propTypes = {
  mainTitle: Proptypes.string,
  placeholder: Proptypes.string,
  isNewsletter: Proptypes.bool,
  toggler: Proptypes.func,
  handleClick: Proptypes.func,
  isPopup: Proptypes.bool,
  Frames: Proptypes.arrayOf(object),
  isIcons: Proptypes.bool,
  selectedDashboard: Proptypes.string,
};

export default CreateNewDashboard;
