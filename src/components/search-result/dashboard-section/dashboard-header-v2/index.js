import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReusableDropDown from '../../../Drop-down-reusable';
import {
  ButtonBoxwpr,
  ButtonWrapper,
  // ButtonTextTwo,
  // CreateDashboardButton,
  // DropdownCont,
  // DropdownItems,
  // DropdownSecondaryItem,
  // DropdownWrap,
  Heading,
  Loader,
  NewsLetterButton,
  Wrpr,
} from './index.sc';
import Add2 from '../../../../assets/icons/Add2';
import Advanced from '../../../../assets/icons/create-dashboard/dropdown/advanced.svg';
import Brand from '../../../../assets/icons/create-dashboard/dropdown/brand.svg';
import People from '../../../../assets/icons/create-dashboard/dropdown/people.svg';
import Industry from '../../../../assets/icons/create-dashboard/dropdown/industry.svg';
import Custom from '../../../../assets/icons/create-dashboard/dropdown/custom.svg';
// import DropDownButton from '../../../../assets/icons/DropDownButton';

import { useNavigate, useParams } from 'react-router-dom';
// import { Button } from '../../../button';
import { theme } from '../../../../constants/theme';
import { useSelector } from 'react-redux';
import CustomPopupWrapper from '../../../custom-popup-wrapper';
import CustomDashboardCanvas from '../../../custom-dashboard-canvas';
import DashboardPopup from '../../../dasboard-popup';
import toast from 'react-hot-toast';
// import { CustomListItem } from './CustomListItem';

export default function DashboardHeaderV2({
  handleSaveDashboard = () => {},
  activeScreen,
  setConfimationAlertPopUp = () => {},
  changeSaved,
  setSelectedPath = () => {},
  setShowSavedSearch = () => {},
  setOverViewClick = () => {},
  setPathName = () => {},
  prevSavedSearch = {},
  selectedSavedSearch,
  filters,
  recentSearchArticlesId,
  isProcessing = false,
  setSelectedDashboardItems = () => {},
}) {
  const { searchId } = useParams();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const dropdownOptions = [
    {
      label: 'Brand & Competition',
      value: 'brand',
      path: `${searchId}/brand`,
      icon: Brand,
      subText: '13 Charts',
    },
    {
      label: 'People',
      value: 'people',
      path: `${searchId}/people`,
      icon: People,
      subText: '6 Charts',
    },
    {
      label: 'Industry',
      value: 'industry',
      path: `${searchId}/industry`,
      icon: Industry,
      subText: '7 Charts',
    },
    {
      label: 'Advanced',
      value: 'advanced',
      path: `${searchId}/advanced`,
      icon: Advanced,
      subText: '5 Charts',
      children: [
        {
          label: 'Campaign Monitor',
          value: 'campaign',
          path: `${searchId}/campaign`,
        },
        {
          label: 'Author Impact',
          value: 'authorimpact',
          path: `${searchId}/authorimpact`,
        },
        {
          label: 'Sentiments By Themes',
          value: 'sentiments',
          path: `${searchId}/sentiments`,
        },
        {
          label: 'Message Congruence',
          value: 'congruence',
          path: `${searchId}/congruence`,
        },
        {
          label: 'PR Impact',
          value: 'primpact',
          path: `${searchId}/primpact`,
        },
      ],
    },
    {
      label: 'Custom',
      value: 'custom',
      path: `${searchId}/custom`,
      icon: Custom,
      subText: '26 Charts',
    },
  ];

  const navigate = useNavigate();
  const navigateNewsletter = () => {
    if (!changeSaved) {
      const comparingData =
        JSON.stringify({ ...prevSavedSearch }) !==
        JSON.stringify({ ...filters });
      // setConfimationAlertPopUp(true);
      if (searchId !== 'custom-search' && comparingData) {
        setConfimationAlertPopUp(true);
        setOverViewClick(true);
        setSelectedPath('/create-news-letter');
      } else if (searchId === 'custom-search' && comparingData) {
        setShowSavedSearch(true);
        setOverViewClick(true);
        setSelectedPath('/create-news-letter');
        // return;
      } else {
        navigate('/create-news-letter');
      }
    } else {
      navigate('/create-news-letter');
    }
  };
  const [customCanvas, setCustomCanvas] = useState(false);
  const createDashboard = (path) => {
    setSelectedDashboard(path.split('/')[1]);

    if (!changeSaved) {
      const comparingData =
        JSON.stringify(prevSavedSearch) !== JSON.stringify(filters);
      if (searchId !== 'custom-search' && comparingData) {
        if (path.split('/')[1] === 'custom') {
          setCustomCanvas(true);
          setSelectedPath(`/dashboard/${path}`);
        } else {
          setConfimationAlertPopUp(true);
          setOverViewClick(true);
          setSelectedPath(`/dashboard/${path}`);
        }
      } else if (searchId === 'custom-search' && comparingData) {
        // if (searchId === 'custom-search') {
        if (path.split('/')[1] === 'custom') {
          setPathName(path.split('/')[1]);
          setCustomCanvas(true);
          setSelectedPath(`/dashboard/${path}`);
        } else {
          setShowSavedSearch(true);
          // }
          setOverViewClick(true);
          setPathName(path.split('/')[1]);
          setSelectedPath(`/dashboard/${path}`);
        }
        // return;
      } else {
        navigate(`/dashboard/${path}`, {
          state: {
            filters,
            recent_searchId: filters?.recent_searchId,
            search_name: filters?.search_name,
            prevPath: true,
          },
        });
      }
    }
    if (path.split('/')[1] === 'custom') {
      setCustomCanvas(true);
      // setConfimationAlertPopUp(true);
    } else if (changeSaved) {
      navigate(`/dashboard/${path}`, {
        state: {
          filters,
          recent_searchId: filters?.recent_searchId,
          search_name: filters?.search_name,
          prevPath: true,
        },
      });
    }
  };

  const childNavigation = (path) => {
    setSelectedDashboard(path.split('/')[1]);
    const comparingData =
      JSON.stringify(prevSavedSearch) !== JSON.stringify(filters);
    if (!changeSaved) {
      if (searchId !== 'custom-search' && comparingData) {
        setConfimationAlertPopUp(true);
        setOverViewClick(true);
        setSelectedPath(`/dashboard/${path}`);
      } else if (searchId === 'custom-search' && comparingData) {
        // if (searchId === 'custom-search') {
        setShowSavedSearch(true);
        // }
        setOverViewClick(true);
        setPathName(path.split('/')[1]);
        setSelectedPath(`/dashboard/${path}`);
        // return;
      }
    }
    const advancedDashboards = dropdownOptions.find(
      (x) => x.value === 'advanced'
    )?.children;
    if (
      advancedDashboards.some((x) => x.value === path.split('/')[1]) &&
      !comparingData
    ) {
      if (
        filters.sentiment &&
        filters.sentiment?.length === 1 &&
        filters.sentiment[0].value === 'NEU'
      ) {
        toast.error(
          'The saved search is based on neutral sentiment. Please unselect the sentiment filter in the Saved Search query.'
        );
        // return;
      } else {
        navigate(`/dashboard/${path}`, {
          state: {
            filters,
            search_name: filters?.search_name,
            recent_searchId: filters?.recent_searchId,
            prevPath: true,
          },
        });
      }
    }
  };

  const [selectedItems, setSelectedItems] = useState({});
  const [selectedDashboard, setSelectedDashboard] = useState('');
  const handleCheckedItems = (e) => {
    setSelectedItems(e);
    setSelectedDashboardItems(e);
  };
  return (
    <>
      <Wrpr activeScreen={activeScreen}>
        <Heading
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            // justifyContent: 'center',
          }}
        >
          <div>Overview </div>
          {isProcessing && (
            <>
              <div style={{ marginLeft: '0.75rem' }}>
                <Loader size="0.25rem" width="1.25rem" height="1.25rem" />
              </div>
              <div
                style={{
                  fontWeight: 'bold',
                  color: theme[selectedTheme].primary,
                  fontSize: '0.75rem',
                  marginLeft: '5px',
                }}
              >
                Crunching numbers...
              </div>
            </>
          )}
        </Heading>
        <NewsLetterButton
          id="coach-create-news-letters-wrp"
          onClick={navigateNewsletter}
        >
          <Add2 height={'1rem'} color={'#675ef2'} />
          {/* <ButtonText>Create Newsletter</ButtonText> */}
          Create Newsletter
        </NewsLetterButton>
        <ReusableDropDown
          dropdownArray={dropdownOptions}
          id="coach-create-dashboard-wrp"
          label="Create Dashboard"
          frontIcon={<Add2 height={'1rem'} color={'#fff'}></Add2>}
          navigation={createDashboard}
          childNavigation={childNavigation}
        ></ReusableDropDown>
        {/* <Button
          title={'Save'}
          backgroundColor={theme[selectedTheme].primary}
          onClick={handleSaveDashboard}
          btnStyle={{ marginLeft: '0.5rem', borderRadius: '0.313rem' }}
        /> */}
        {
          <DashboardPopup
            open={customCanvas}
            toggler={setCustomCanvas}
            popContent={
              <CustomPopupWrapper
                heading="Add/Remove Charts"
                footer={
                  <ButtonWrapper>
                    <ButtonBoxwpr
                      onClick={() => {
                        setSelectedItems({});
                        setSelectedDashboardItems({});
                        setCustomCanvas(false);
                      }}
                    >
                      Cancel
                    </ButtonBoxwpr>
                    <ButtonBoxwpr
                      background={theme[selectedTheme].primary}
                      fontColor={'#fff'}
                      onClick={() => {
                        const comparingData =
                          JSON.stringify(prevSavedSearch) !==
                          JSON.stringify(filters);
                        if (
                          !Object.keys(selectedItems).filter(
                            (items) =>
                              Object.keys(selectedItems[items]).filter(
                                (item) => selectedItems[items][item]
                              ).length
                          ).length &&
                          changeSaved
                        ) {
                          navigate(
                            `/dashboard/${searchId}/${selectedDashboard}/`,
                            {
                              state: {
                                filters,
                                selectedItems: JSON.stringify(selectedItems),
                                search_name: filters?.search_name,
                                recent_searchId: filters?.recent_searchId,
                                prevPath: true,
                              },
                            }
                          );
                        } else if (
                          searchId !== 'custom-search' &&
                          comparingData
                        ) {
                          setConfimationAlertPopUp(true);
                          setOverViewClick(true);
                        } else if (
                          searchId === 'custom-search' &&
                          comparingData
                        ) {
                          setShowSavedSearch(true);
                          setOverViewClick(true);
                        } else {
                          navigate(
                            `/dashboard/${searchId}/${selectedDashboard}/`,
                            {
                              state: {
                                filters,
                                selectedItems: JSON.stringify(selectedItems),
                                search_name: filters?.search_name,
                                recent_searchId: filters?.recent_searchId,
                                prevPath: true,
                              },
                            }
                          );
                        }

                        setCustomCanvas(false);
                      }}
                      disabled={
                        !Object.keys(selectedItems).filter(
                          (items) =>
                            Object.keys(selectedItems[items]).filter(
                              (item) => selectedItems[items][item]
                            ).length
                        ).length
                      }
                    >
                      Create Dashboard
                    </ButtonBoxwpr>
                  </ButtonWrapper>
                }
              >
                <CustomDashboardCanvas
                  handleItemClick={handleCheckedItems}
                  selectedItems={selectedItems}
                ></CustomDashboardCanvas>
              </CustomPopupWrapper>
            }
            width={'auto'}
            padding="0"
            Cross={true}
            borderRadius="0.75rem"
          />
        }
      </Wrpr>
    </>
  );
}

DashboardHeaderV2.propTypes = {
  handleSaveDashboard: PropTypes.func,
  activeScreen: PropTypes.string,
  setConfimationAlertPopUp: PropTypes.func,
  setSelectedPath: PropTypes.func,
  changeSaved: PropTypes.bool,
  selectedSavedSearch: PropTypes.string,
  filters: PropTypes.object || null || undefined,
  recentSearchArticlesId: PropTypes.number,
  isProcessing: PropTypes.bool,
  setShowSavedSearch: PropTypes.func,
  setOverViewClick: PropTypes.func,
  setPathName: PropTypes.func,
  prevSavedSearch: PropTypes.object,
  setSelectedDashboardItems: PropTypes.func,
};
